
import React from "react";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  highlight?: boolean;
  buttonText: string;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    description: "Essential features for small businesses",
    features: [
      "Up to 100 calls per month",
      "8AM-5PM reception hours", 
      "Basic voicemail transcription",
      "Email notifications"
    ],
    buttonText: "Start Basic"
  },
  {
    id: "pro",
    name: "Professional",
    price: 29.99,
    description: "Advanced features for growing businesses",
    features: [
      "Up to 500 calls per month",
      "24/7 reception coverage",
      "Full call transcription",
      "SMS & email notifications",
      "Custom business hours"
    ],
    highlight: true,
    buttonText: "Start Professional"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99.99,
    description: "Complete solution for large businesses",
    features: [
      "Unlimited calls",
      "24/7 premium coverage",
      "Full call transcription",
      "Priority support",
      "Custom greetings",
      "Advanced analytics",
      "Dedicated account manager"
    ],
    buttonText: "Contact Sales"
  }
];

interface SubscriptionPlansProps {
  currentPlan?: string | null;
  isSubscribed?: boolean;
  onPortal?: () => void;
}

export function SubscriptionPlans({ currentPlan, isSubscribed, onPortal }: SubscriptionPlansProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribe = async (planId: string) => {
    try {
      setIsLoading(planId);
      
      // For enterprise plan, show contact message
      if (planId === "enterprise") {
        toast({
          title: "Enterprise Plan",
          description: "Please contact our sales team for enterprise subscription",
        });
        setIsLoading(null);
        return;
      }

      // If current user already has this plan
      if (isSubscribed && currentPlan === planId) {
        if (onPortal) {
          onPortal();
        } else {
          await handleCustomerPortal();
        }
        return;
      }

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { plan: planId },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleCustomerPortal = async () => {
    try {
      setIsLoading("portal");
      
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
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => {
        // Check if this is the user's current plan
        const isCurrentPlan = isSubscribed && currentPlan === plan.id;
        
        return (
          <Card 
            key={plan.id}
            className={plan.highlight ? "border-purple-600 shadow-lg shadow-purple-100" : ""}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {plan.name}
                {plan.highlight && (
                  <span className="text-xs font-normal bg-purple-100 text-purple-800 py-0.5 px-2 rounded-full">
                    Popular
                  </span>
                )}
                {isCurrentPlan && (
                  <span className="text-xs font-normal bg-green-100 text-green-800 py-0.5 px-2 rounded-full">
                    Current Plan
                  </span>
                )}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-sm text-gray-500 ml-1">/month</span>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={plan.highlight ? "bg-purple-600 hover:bg-purple-700 w-full" : "w-full"}
                onClick={() => handleSubscribe(plan.id)}
                disabled={isLoading !== null}
              >
                {isLoading === plan.id ? "Processing..." : isCurrentPlan ? "Manage Plan" : plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default SubscriptionPlans;
