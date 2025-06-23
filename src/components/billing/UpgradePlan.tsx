
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { AlertCircle, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const UpgradePlan = () => {
  const { tier, upgrade } = useSubscription();
  const { toast } = useToast();
  
  const handleUpgrade = async (newTier: 'starter' | 'professional' | 'enterprise') => {
    try {
      await upgrade(newTier);
      toast({
        title: "Subscription Updated",
        description: `You've successfully upgraded to the ${newTier} plan.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subscription. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upgrade Your Plan</CardTitle>
        <CardDescription>Choose the plan that works best for you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter Plan */}
          <div className={`border rounded-lg p-6 ${tier === 'starter' ? 'bg-[#E3F2FD] dark:bg-[#1A237E]/20 border-[#1A237E]' : 'dark:border-gray-700'}`}>
            <h3 className="font-bold text-lg">Starter</h3>
            <p className="text-2xl font-bold mt-2">$299<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>24/7 AI Receptionist</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>Up to 500 minutes/month</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>Basic call analytics</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>Email notifications</span>
              </li>
            </ul>
            <Button 
              className="w-full mt-6"
              variant={tier === 'starter' ? 'secondary' : 'default'}
              disabled={tier === 'starter'}
              onClick={() => handleUpgrade('starter')}
            >
              {tier === 'starter' ? 'Current Plan' : 'Select Starter'}
            </Button>
          </div>
          
          {/* Professional Plan */}
          <div className={`border rounded-lg p-6 ${tier === 'professional' ? 'bg-[#E3F2FD] dark:bg-[#1A237E]/20 border-[#1A237E]' : 'dark:border-gray-700'}`}>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Professional</h3>
              <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                POPULAR
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">$599<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>Everything in Starter</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>Up to 1500 minutes/month</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>Advanced call routing</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>SMS notifications</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>Custom voice selection</span>
              </li>
            </ul>
            <Button 
              className="w-full mt-6"
              variant={tier === 'professional' ? 'secondary' : 'default'}
              disabled={tier === 'professional'}
              onClick={() => handleUpgrade('professional')}
            >
              {tier === 'professional' ? 'Current Plan' : 'Select Professional'}
            </Button>
          </div>
          
          {/* Enterprise Plan */}
          <div className={`border rounded-lg p-6 ${tier === 'enterprise' ? 'bg-[#E3F2FD] dark:bg-[#1A237E]/20 border-[#1A237E]' : 'dark:border-gray-700'}`}>
            <h3 className="font-bold text-lg">Enterprise</h3>
            <p className="text-2xl font-bold mt-2">$1,299<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>Everything in Professional</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>Unlimited minutes</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>Premium voice options</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>API integration</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>Custom script development</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>Dedicated support</span>
              </li>
            </ul>
            <Button 
              className="w-full mt-6"
              variant={tier === 'enterprise' ? 'secondary' : 'default'}
              disabled={tier === 'enterprise'}
              onClick={() => handleUpgrade('enterprise')}
            >
              {tier === 'enterprise' ? 'Current Plan' : 'Select Enterprise'}
            </Button>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-400">Need a custom solution?</h4>
              <p className="text-sm text-yellow-600 dark:text-yellow-500">
                Contact our sales team for a tailored quote that meets your specific business requirements.
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto text-yellow-700 dark:text-yellow-400">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
