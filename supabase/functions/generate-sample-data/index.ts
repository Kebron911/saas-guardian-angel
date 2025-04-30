
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

interface CallRecord {
  user_id: string;
  from_number: string;
  to_number: string;
  direction: string;
  status: string;
  duration: number;
  started_at: string;
  ended_at: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const generatePhoneNumber = () => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNum = Math.floor(Math.random() * 9000) + 1000;
  return `(${areaCode}) ${prefix}-${lineNum}`;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Use the service role key to bypass RLS
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    // Get the authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    if (userError) {
      throw new Error(`Authentication error: ${userError.message}`);
    }
    
    const user = userData.user;
    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    // Generate sample call data
    const callStatuses = ["completed", "no-answer", "busy"];
    const callDirections = ["inbound", "outbound"];
    const callRecords: CallRecord[] = [];
    
    // Generate calls for the last 30 days
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Generate between 50 and 100 sample calls
    const numCalls = Math.floor(Math.random() * 50) + 50;
    
    for (let i = 0; i < numCalls; i++) {
      // Random date in the last 30 days
      const callDate = new Date(thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime()));
      
      // Duration between 10 seconds and 10 minutes
      const durationSeconds = Math.floor(Math.random() * 590) + 10;
      
      const startedAt = callDate.toISOString();
      const endedAt = new Date(callDate.getTime() + durationSeconds * 1000).toISOString();
      
      const status = callStatuses[Math.floor(Math.random() * callStatuses.length)];
      const direction = callDirections[Math.floor(Math.random() * callDirections.length)];
      
      callRecords.push({
        user_id: user.id,
        from_number: generatePhoneNumber(),
        to_number: generatePhoneNumber(),
        direction,
        status,
        duration: status === "completed" ? durationSeconds : 0,
        started_at: startedAt,
        ended_at: status === "completed" ? endedAt : null,
      });
    }
    
    // Insert the sample data
    const { data: insertedCalls, error: insertError } = await supabaseAdmin
      .from('calls')
      .insert(callRecords);
      
    if (insertError) {
      throw new Error(`Error inserting sample data: ${insertError.message}`);
    }
    
    // Generate sample subscription data if it doesn't exist
    const { data: subscriptionData, error: subCheckError } = await supabaseAdmin
      .from('subscriptions')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();
      
    if (subCheckError) {
      throw new Error(`Error checking subscription: ${subCheckError.message}`);
    }
    
    if (!subscriptionData) {
      // Insert a sample subscription
      const planTypes = ['basic', 'pro', 'enterprise'];
      const randomPlan = planTypes[Math.floor(Math.random() * planTypes.length)];
      
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      
      const { error: subInsertError } = await supabaseAdmin
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan_type: randomPlan,
          status: 'active',
          cancel_at_period_end: false,
          current_period_start: new Date().toISOString(),
          current_period_end: futureDate.toISOString(),
          stripe_customer_id: `cus_sample_${Math.random().toString(36).substring(2, 15)}`,
          stripe_subscription_id: `sub_sample_${Math.random().toString(36).substring(2, 15)}`
        });
        
      if (subInsertError) {
        throw new Error(`Error inserting sample subscription: ${subInsertError.message}`);
      }
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: `Generated ${numCalls} sample calls for user`,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error generating sample data:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
