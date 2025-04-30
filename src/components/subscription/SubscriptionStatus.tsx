
import React from "react";
import { useState, useEffect } from "react";
import { Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";

interface SubscriptionStatusProps {
  isSubscribed: boolean;
  plan: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  onManageSubscription: () => void;
  isLoading?: boolean;
}

export function SubscriptionStatus({
  isSubscribed,
  plan,
  currentPeriodEnd,
  cancelAtPeriodEnd,
  onManageSubscription,
  isLoading = false
}: SubscriptionStatusProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; percentage: number }>({ days: 0, percentage: 0 });
  
  useEffect(() => {
    // Calculate time left in subscription and percentage
    if (isSubscribed && currentPeriodEnd) {
      const endDate = new Date(currentPeriodEnd);
      const now = new Date();
      const totalDays = 30; // Assuming monthly billing cycle
      
      const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      const daysUsed = totalDays - daysLeft;
      const percentage = Math.max(0, Math.min(100, (daysUsed / totalDays) * 100));
      
      setTimeLeft({ days: daysLeft, percentage });
    }
  }, [isSubscribed, currentPeriodEnd]);

  // Display different plan names
  const getPlanDisplay = (planId: string | null) => {
    switch (planId) {
      case "basic":
        return { name: "Basic", color: "text-blue-600" };
      case "pro":
        return { name: "Professional", color: "text-purple-600" };
      case "enterprise":
        return { name: "Enterprise", color: "text-indigo-600" };
      default:
        return { name: "Free", color: "text-gray-600" };
    }
  };

  const planDisplay = getPlanDisplay(plan);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
          </CardTitle>
          <CardDescription>
            <div className="h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-4"></div>
          <div className="h-16 w-full bg-gray-200 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (!isSubscribed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-orange-500" />
            No Active Subscription
          </CardTitle>
          <CardDescription>
            You don't have an active subscription yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            Subscribe to a plan to access all features of our AI receptionist service.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={onManageSubscription} className="w-full">
            View Plans
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
          <span className={planDisplay.color}>{planDisplay.name} Plan</span>
          {cancelAtPeriodEnd && (
            <span className="ml-2 text-xs bg-orange-100 text-orange-800 py-0.5 px-2 rounded-full">
              Cancels at period end
            </span>
          )}
        </CardTitle>
        <CardDescription>
          {cancelAtPeriodEnd 
            ? "Your subscription will end after the current period"
            : "Your subscription is active and will renew automatically"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1 text-sm">
              <span className="text-gray-500">Current period</span>
              {currentPeriodEnd && (
                <span className="text-gray-900 font-medium flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {timeLeft.days} days left
                </span>
              )}
            </div>
            <Progress value={timeLeft.percentage} className="h-2" />
          </div>
          
          {currentPeriodEnd && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Renews on</span>
              <span className="text-gray-900 font-medium flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                {format(new Date(currentPeriodEnd), "MMM d, yyyy")}
              </span>
            </div>
          )}
          
          {/* Add more subscription details here if needed */}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onManageSubscription} variant="outline" className="w-full">
          Manage Subscription
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SubscriptionStatus;
