
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// This endpoint needs to be public (no JWT verification)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the stripe secret key and webhook secret
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    
    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Get the request body as text for signature verification
    const body = await req.text();
    
    // Get the signature from headers
    const signature = req.headers.get("stripe-signature");
    
    let event;
    
    // Verify webhook signature and extract the event
    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new Response(JSON.stringify({ error: `Webhook signature verification failed: ${err.message}` }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    } else {
      console.warn("Webhook secret not configured or signature missing - skipping verification");
      event = JSON.parse(body);
    }
    
    console.log(`Processing webhook event: ${event.type}`);
    
    // Create Supabase client with service role key to bypass RLS
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(supabaseClient, event.data.object, stripe);
        break;
        
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(supabaseClient, event.data.object);
        break;
        
      case 'checkout.session.completed':
        if (event.data.object.mode === 'subscription') {
          const session = event.data.object;
          await handleCheckoutCompleted(supabaseClient, session, stripe);
        }
        break;
        
      // You can add more event handlers here
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 200,
    });
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error in webhook handler: ${errorMessage}`);
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 500,
    });
  }
});

// Helper function to handle subscription changes
async function handleSubscriptionChange(
  supabase: any,
  subscription: any,
  stripe: any
) {
  try {
    const customerId = subscription.customer;
    
    // Get customer to find user_id
    const customer = await stripe.customers.retrieve(customerId);
    const userId = customer.metadata?.user_id;
    
    if (!userId) {
      console.error("No user_id found in customer metadata");
      return;
    }
    
    // Determine the plan based on the price
    const priceId = subscription.items.data[0].price.id;
    const price = await stripe.prices.retrieve(priceId);
    let plan = "basic";
    
    // Map price amount to plan type
    const amount = price.unit_amount || 0;
    if (amount >= 9000) {
      plan = "enterprise";
    } else if (amount >= 2000) {
      plan = "pro";
    }
    
    // Update the subscription in the database
    await supabase.from("subscriptions").upsert({
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      plan_type: plan,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
    
    console.log(`Updated subscription for user ${userId}: ${plan} plan, status ${subscription.status}`);
  } catch (error) {
    console.error("Error handling subscription change:", error);
    throw error;
  }
}

// Helper function to handle subscription deletions
async function handleSubscriptionDeleted(
  supabase: any,
  subscription: any
) {
  try {
    const userId = subscription.metadata?.user_id;
    
    // If we don't have the user ID in metadata, try to find it in our database
    if (!userId) {
      const { data } = await supabase
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_subscription_id", subscription.id)
        .single();
      
      if (!data?.user_id) {
        console.error("Could not find user ID for subscription:", subscription.id);
        return;
      }
      
      // Update subscription status
      await supabase
        .from("subscriptions")
        .update({
          status: "inactive",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", subscription.id);
    } else {
      // Update subscription status using user ID
      await supabase
        .from("subscriptions")
        .update({
          status: "inactive",
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);
    }
    
    console.log(`Marked subscription as inactive for subscription ${subscription.id}`);
  } catch (error) {
    console.error("Error handling subscription deletion:", error);
    throw error;
  }
}

// Helper function to handle checkout completion
async function handleCheckoutCompleted(
  supabase: any,
  session: any,
  stripe: any
) {
  try {
    // If the checkout session is for a subscription
    if (session.mode === 'subscription' && session.subscription) {
      // Get the subscription
      const subscription = await stripe.subscriptions.retrieve(session.subscription);
      
      // Get the customer
      const customer = await stripe.customers.retrieve(session.customer);
      
      let userId = customer.metadata?.user_id;
      
      // If no user ID in metadata, try to get it from session metadata
      if (!userId && session.metadata?.user_id) {
        userId = session.metadata.user_id;
        
        // Update the customer with the user ID
        await stripe.customers.update(customer.id, {
          metadata: { user_id: userId },
        });
      }
      
      if (!userId) {
        console.error("No user ID found in session or customer metadata");
        return;
      }
      
      // Now handle the subscription the same way as the subscription update event
      await handleSubscriptionChange(supabase, subscription, stripe);
    }
  } catch (error) {
    console.error("Error handling checkout completion:", error);
    throw error;
  }
}
