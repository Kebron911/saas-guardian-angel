
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get the request body
    const requestData = await req.json();
    const userId = requestData.user_id || "demo-user";

    console.log(`Generating sample data for user ID: ${userId}`);

    // Generate sample call data
    const callData = await generateCallData(supabaseClient, userId);
    
    // Return the result
    return new Response(
      JSON.stringify({
        success: true,
        message: "Sample data generated successfully",
        callsGenerated: callData.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error generating sample data:", error.message);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});

async function generateCallData(supabase: any, userId: string) {
  // First, clear existing data for this user
  await supabase.from("calls").delete().eq("user_id", userId);

  const callCount = 50; // Generate 50 sample calls
  const phoneNumbers = [
    "+1234567890",
    "+1987654321",
    "+1555123456",
    "+1555987654",
    "+1555555555",
  ];

  const today = new Date();
  const callData = [];

  // Generate calls spread over the last 30 days
  for (let i = 0; i < callCount; i++) {
    const daysAgo = Math.floor(Math.random() * 30); // Up to 30 days ago
    const callDate = new Date(today);
    callDate.setDate(today.getDate() - daysAgo);
    
    const fromNumber = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
    const toNumber = "+15551234567"; // Your business number
    const duration = Math.floor(Math.random() * 300) + 20; // 20-320 seconds
    const direction = Math.random() > 0.3 ? "inbound" : "outbound";
    const status = Math.random() > 0.2 ? "completed" : "missed";
    
    // Generate random time for the call on that day
    const hours = Math.floor(Math.random() * 12) + 8; // Between 8am and 8pm
    const minutes = Math.floor(Math.random() * 60);
    callDate.setHours(hours, minutes);
    
    const call = {
      user_id: userId,
      from_number: fromNumber,
      to_number: toNumber,
      direction,
      status,
      duration: status === "completed" ? duration : null,
      created_at: callDate.toISOString(),
      started_at: status === "completed" ? callDate.toISOString() : null,
      ended_at: status === "completed" ? 
        new Date(callDate.getTime() + duration * 1000).toISOString() : null
    };
    
    callData.push(call);
  }

  // Sort by date (newest first)
  callData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  
  // Insert the data in smaller batches to avoid timeouts
  const batchSize = 10;
  for (let i = 0; i < callData.length; i += batchSize) {
    const batch = callData.slice(i, i + batchSize);
    const { data, error } = await supabase.from("calls").insert(batch);
    if (error) throw error;
  }
  
  // Generate subscription data as well
  const plans = ["basic", "pro", "enterprise"];
  const subscriptionData = [];
  
  // Generate between 5-15 subscriptions
  const subscriptionCount = Math.floor(Math.random() * 10) + 5;
  
  for (let i = 0; i < subscriptionCount; i++) {
    const planType = plans[Math.floor(Math.random() * plans.length)];
    const startDate = new Date();
    startDate.setDate(today.getDate() - Math.floor(Math.random() * 90)); // Up to 90 days ago
    
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1); // One month subscription
    
    const subscription = {
      user_id: `demo-user-${i + 1}`,
      plan_type: planType,
      status: Math.random() > 0.1 ? "active" : "canceled",
      current_period_start: startDate.toISOString(),
      current_period_end: endDate.toISOString(),
      created_at: startDate.toISOString(),
      updated_at: startDate.toISOString(),
      cancel_at_period_end: Math.random() > 0.8
    };
    
    subscriptionData.push(subscription);
  }
  
  // Insert subscription data
  if (subscriptionData.length > 0) {
    // Clear existing demo subscriptions first
    await supabase.from("subscriptions")
      .delete()
      .like("user_id", "demo-user-%");
      
    const { data, error } = await supabase.from("subscriptions").insert(subscriptionData);
    if (error) throw error;
  }
  
  return callData;
}
