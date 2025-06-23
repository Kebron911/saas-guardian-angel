
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign } from "lucide-react";
import { GenerateSampleData } from "@/components/dashboard/GenerateSampleData";
import { useSubscription } from "@/contexts/SubscriptionContext";

export const UsageAnalytics = () => {
  const { tier } = useSubscription();
  
  // Determine max minutes based on tier
  const getMaxMinutes = () => {
    switch(tier) {
      case 'starter': return 500;
      case 'professional': return 1500;
      case 'enterprise': return 'Unlimited';
      default: return 100;
    }
  };
  
  const maxMinutes = getMaxMinutes();
  const currentUsage = 178;
  const usagePercentage = typeof maxMinutes === 'number' ? (currentUsage / maxMinutes) * 100 : 0;
  
  // Format plan name with first letter capitalized
  const planName = tier.charAt(0).toUpperCase() + tier.slice(1);
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Usage Analytics</CardTitle>
        <CardDescription>Monitor your subscription usage and metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-[#E3F2FD] dark:bg-[#1A237E]/20 rounded-full">
                <Clock className="h-5 w-5 text-[#1A237E] dark:text-[#00B8D4]" />
              </div>
              <div>
                <p className="font-medium">Minutes Used</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentUsage} / {maxMinutes} minutes
                </p>
              </div>
            </div>
            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div 
                className="h-2 bg-green-500 rounded-full" 
                style={{ width: `${typeof maxMinutes === 'number' ? usagePercentage : 0}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-[#E3F2FD] dark:bg-[#1A237E]/20 rounded-full">
                <DollarSign className="h-5 w-4 mr-2 mt-0.5 text-[#1A237E] dark:text-[#00B8D4]" />
              </div>
              <div>
                <p className="font-medium">Cost Savings</p>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Estimated $1,240 saved this month
                  </p>
                  <p className="text-sm font-medium text-[#1A237E] dark:text-[#00B8D4] mt-1">
                    Current Plan: {planName}
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">View Report</Button>
          </div>
        </div>
        <div className="mt-4">
          <GenerateSampleData />
        </div>
      </CardContent>
    </Card>
  );
};
