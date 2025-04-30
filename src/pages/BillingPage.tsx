
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";
import SubscriptionStatus from "@/components/subscription/SubscriptionStatus";
import { useQuery } from "@tanstack/react-query";

interface SubscriptionData {
  active: boolean;
  plan: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

const BillingPage = () => {
  const [activeTab, setActiveTab] = useState<string>("current");
  const { toast } = useToast();

  // Check subscription status
  const checkSubscription = async (): Promise<SubscriptionData> => {
    const { data, error } = await supabase.functions.invoke("check-subscription", {});
    
    if (error) {
      toast({
        title: "Error checking subscription",
        description: error.message,
        variant: "destructive",
      });
      throw new Error(error.message);
    }
    
    return data;
  };

  const { data: subscription, isLoading, refetch } = useQuery({
    queryKey: ["subscription"],
    queryFn: checkSubscription,
    refetchInterval: 60000, // Refetch every minute
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    // If there's a session_id in the URL params, it means the user just completed checkout
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("session_id");
    
    if (sessionId) {
      // Remove the session_id from the URL
      url.searchParams.delete("session_id");
      window.history.replaceState({}, document.title, url.toString());
      
      // Show a success message
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our service.",
      });
      
      // Refresh subscription data
      refetch();
    }
  }, [toast, refetch]);

  const handleManageSubscription = () => {
    setActiveTab("plans");
  };

  const handleCustomerPortal = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal", {});
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Redirect to Stripe Customer Portal
      window.location.href = data.url;
    } catch (error: any) {
      console.error("Error opening customer portal:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to open customer portal",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Billing & Subscription</h2>
        <p className="text-gray-500">Manage your plan and payment details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Subscription status */}
        <div className="lg:col-span-1">
          <SubscriptionStatus
            isSubscribed={subscription?.active || false}
            plan={subscription?.plan || null}
            currentPeriodEnd={subscription?.current_period_end || null}
            cancelAtPeriodEnd={subscription?.cancel_at_period_end || false}
            onManageSubscription={handleManageSubscription}
            isLoading={isLoading}
          />

          {subscription?.active && (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <Button 
                  onClick={handleCustomerPortal} 
                  variant="outline" 
                  className="w-full"
                >
                  Manage Payment Methods
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Current billing cycle</span>
                  <span className="font-medium">Monthly</span>
                </div>
                {subscription?.active && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Next invoice</span>
                      <span className="font-medium">
                        {subscription.current_period_end ? 
                          new Date(subscription.current_period_end).toLocaleDateString() : 
                          "-"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column: Subscription tabs */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="current">Current Plan</TabsTrigger>
              <TabsTrigger value="plans">Available Plans</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              {isLoading ? (
                <div className="h-60 flex items-center justify-center">
                  <p className="text-gray-500">Loading subscription details...</p>
                </div>
              ) : subscription?.active ? (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Current Plan</h3>
                  <div className="space-y-4">
                    {/* Display features based on current plan */}
                    {subscription.plan === "basic" && (
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Up to 100 calls per month</li>
                        <li>8AM-5PM reception hours</li>
                        <li>Basic voicemail transcription</li>
                        <li>Email notifications</li>
                      </ul>
                    )}
                    
                    {subscription.plan === "pro" && (
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Up to 500 calls per month</li>
                        <li>24/7 reception coverage</li>
                        <li>Full call transcription</li>
                        <li>SMS & email notifications</li>
                        <li>Custom business hours</li>
                      </ul>
                    )}
                    
                    {subscription.plan === "enterprise" && (
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Unlimited calls</li>
                        <li>24/7 premium coverage</li>
                        <li>Full call transcription</li>
                        <li>Priority support</li>
                        <li>Custom greetings</li>
                        <li>Advanced analytics</li>
                        <li>Dedicated account manager</li>
                      </ul>
                    )}
                  </div>
                  
                  <div className="flex space-x-4 mt-6">
                    <Button onClick={() => setActiveTab("plans")}>
                      Change Plan
                    </Button>
                    <Button variant="outline" onClick={handleCustomerPortal}>
                      Manage Billing
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold mb-4">No Active Subscription</h3>
                  <p className="text-gray-500 mb-6">
                    You don't have an active subscription. Choose a plan to get started with our
                    AI receptionist service.
                  </p>
                  <Button onClick={() => setActiveTab("plans")}>
                    View Plans
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="plans">
              <h3 className="text-xl font-semibold mb-6">Choose a Plan</h3>
              <SubscriptionPlans 
                currentPlan={subscription?.plan || null} 
                isSubscribed={subscription?.active || false}
                onPortal={handleCustomerPortal}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;
