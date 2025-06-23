import { useAuth } from "@/contexts/AuthContext";
import { DatabaseInterface } from '@/database_interface';
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$299/mo",
    description: "Perfect for small businesses.",
    features: [
      "24/7 AI Receptionist",
      "Up to 500 minutes/month",
      "Basic call analytics",
      "Email notifications"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    price: "$599/mo",
    description: "For growing businesses.",
    features: [
      "Everything in Starter",
      "Up to 1500 minutes/month",
      "Advanced call routing",
      "SMS notifications",
      "Custom voice selection"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$1,299/mo",
    description: "For organizations with complex needs.",
    features: [
      "Everything in Professional",
      "Unlimited minutes",
      "Premium voice options",
      "API integration",
      "Custom script development",
      "Dedicated support"
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
      navigate("/login?redirect=pricing");
      return;
    }

    try {
      setIsLoading(planId);
      
      if (planId === "enterprise") {
        toast({
          title: "Enterprise Plan",
          description: "Please contact our sales team for enterprise subscription",
        });
        setIsLoading(null);
        return;
      }

      // Create checkout session
      const checkoutData = await DatabaseInterface.insert('checkout_sessions', {
        user_id: session.user.id,
        plan: planId
      });

      if (checkoutData?.url) {
        window.location.href = checkoutData.url;
      } else {
        throw new Error("Failed to create checkout session");
      }
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
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Get Started with Professional AI Assistants</h2>
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
                    ? "Select Enterprise" 
                    : `Select ${plan.name}`}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
