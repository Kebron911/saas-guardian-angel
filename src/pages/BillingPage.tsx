
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CreditCard, FileText, History, ArrowUp } from "lucide-react";
import { PaymentMethods } from "@/components/billing/PaymentMethods";
import { BillingHistory } from "@/components/billing/BillingHistory";
import { UpgradePlan } from "@/components/billing/UpgradePlan";
import { UsageAnalytics } from "@/components/billing/UsageAnalytics";

const BillingPage = () => {
  const { toast } = useToast();
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Billing & Subscription</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your subscription, payment methods, and billing details
        </p>
      </div>
      
      <Tabs defaultValue="plan" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="plan" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Usage</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Payment Methods</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>Billing History</span>
          </TabsTrigger>
          <TabsTrigger value="upgrade" className="flex items-center gap-2">
            <ArrowUp className="h-4 w-4" />
            <span>Upgrade Plan</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="plan" className="space-y-6">
          <UsageAnalytics />
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-6">
          <PaymentMethods />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <BillingHistory />
        </TabsContent>
        
        <TabsContent value="upgrade" className="space-y-6">
          <UpgradePlan />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default BillingPage;
