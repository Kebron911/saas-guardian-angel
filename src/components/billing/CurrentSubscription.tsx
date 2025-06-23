
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import { useBillingData } from "@/hooks/useBillingData";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubscription } from "@/contexts/SubscriptionContext";

export function CurrentSubscription() {
  const { billingData, isLoading, error } = useBillingData();
  const { tier } = useSubscription();

  if (isLoading) {
    return (
      <Card className="border-[#9b87f5]/40 shadow-md">
        <CardHeader>
          <CardTitle><Skeleton className="h-7 w-48" /></CardTitle>
          <CardDescription><Skeleton className="h-5 w-32" /></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-2 w-full" />
            </div>
            
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-2 w-full" />
            </div>
            
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-2 w-full" />
            </div>
            
            <ul className="space-y-2 mt-4">
              {Array(5).fill(0).map((_, i) => (
                <li key={i} className="flex items-center">
                  <Skeleton className="h-4 w-4 rounded-full mr-2" />
                  <Skeleton className="h-4 w-full" />
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  }

  if (error || !billingData) {
    return (
      <Card className="border-[#9b87f5]/40 shadow-md">
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-500">
            Error loading subscription data
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Use the tier from subscription context rather than the billing data
  const planName = tier.charAt(0).toUpperCase() + tier.slice(1); // Capitalize first letter
  const { renewalDate, usage } = billingData;
  
  // Customize features based on plan tier
  const features = tier === 'starter' ? [
    "500 calls per month",
    "Basic transcriptions",
    "5GB storage",
    "Email support",
    "Basic analytics"
  ] : billingData.currentPlan.features;
  
  // Adjust price based on tier
  const price = tier === 'starter' ? "$299" : 
              tier === 'professional' ? "$599" : 
              tier === 'enterprise' ? "$1,299" : "$299";
  
  return (
    <Card className="border-[#9b87f5]/40 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{planName} Plan</span>
          <span className="text-[#9b87f5]">{price}/mo</span>
        </CardTitle>
        <CardDescription>Renews on {renewalDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Calls Used</span>
              <span>{usage.calls.currentUsage}/{usage.calls.limit === 0 ? "∞" : usage.calls.limit}</span>
            </div>
            <Progress value={usage.calls.percentage} className="h-2 bg-gray-100 dark:bg-gray-700">
              <div className="h-full bg-[#9b87f5]" style={{width: `${usage.calls.percentage}%`}}></div>
            </Progress>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Transcriptions</span>
              <span>{usage.transcriptions.currentUsage}/{usage.transcriptions.limit === 0 ? "∞" : usage.transcriptions.limit}</span>
            </div>
            <Progress value={0} className="h-2 bg-gray-100 dark:bg-gray-700">
              <div className="h-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] w-full flex items-center justify-center text-[10px] text-white">
                {tier === 'starter' ? `${usage.transcriptions.currentUsage}/${usage.transcriptions.limit}` : "UNLIMITED"}
              </div>
            </Progress>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage (GB)</span>
              <span>{usage.storage.currentUsage}/{usage.storage.limit === 0 ? "∞" : usage.storage.limit}GB</span>
            </div>
            <Progress value={usage.storage.percentage} className="h-2 bg-gray-100 dark:bg-gray-700">
              <div className="h-full bg-[#9b87f5]" style={{width: `${usage.storage.percentage}%`}}></div>
            </Progress>
          </div>
          
          <ul className="space-y-2 mt-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="h-4 w-4 text-[#9b87f5] mr-2" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white" variant="outline">Manage Subscription</Button>
      </CardFooter>
    </Card>
  );
}
