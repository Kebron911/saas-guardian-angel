
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$9.99/mo",
    description: "Perfect for small businesses.",
    features: [
      "Up to 100 calls per month",
      "8AM-5PM reception hours",
      "Basic voicemail transcription",
      "Email notifications"
    ]
  },
  {
    id: "pro",
    name: "Professional",
    price: "$29.99/mo",
    description: "For growing businesses.",
    features: [
      "Up to 500 calls per month",
      "24/7 reception coverage",
      "Full call transcription",
      "SMS & email notifications",
      "Custom business hours"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Contact Us",
    description: "For large organizations.",
    features: [
      "Unlimited calls",
      "24/7 premium coverage",
      "Full call transcription",
      "Priority support",
      "Custom greetings",
      "Advanced analytics",
      "Dedicated account manager"
    ]
  }
];

const PricingSection = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    if (!session?.user) {
      // Not logged in, redirect to login page
      navigate("/login?redirect=pricing");
      return;
    }

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

  return (
    <section id="pricing" className="py-16 bg-gradient-to-b from-white via-purple-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Pricing</h2>
        <div className="flex flex-col md:flex-row gap-7 justify-center">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`flex-1 bg-white border rounded-2xl shadow-md p-8 flex flex-col mb-4 ${
                plan.name === "Professional" ? "border-purple-500 shadow-purple-100 scale-105 z-10" : ""
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="text-3xl font-extrabold text-gray-900 mb-2">{plan.price}</div>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-sm text-gray-800">&#10003; {feature}</li>
                ))}
              </ul>
              <Button
                onClick={() => handleSelectPlan(plan.id)}
                className={`mt-auto text-white text-center font-bold rounded-lg py-2 px-4 w-full transition-all ${
                  plan.name === "Professional" 
                    ? "bg-purple-600 hover:bg-purple-700 shadow" 
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
                disabled={isLoading !== null}
              >
                {isLoading === plan.id 
                  ? "Processing..." 
                  : plan.name === "Enterprise" 
                    ? "Contact Sales" 
                    : "Choose Plan"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
