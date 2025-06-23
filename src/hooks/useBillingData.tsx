
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface PlanDetails {
  name: string;
  price: string;
  billingCycle: string;
  features: string[];
}

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

interface InvoiceItem {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
}

interface UsageData {
  currentUsage: number;
  limit: number;
  percentage: number;
}

export interface BillingData {
  currentPlan: PlanDetails;
  renewalDate: string;
  paymentMethods: PaymentMethod[];
  invoiceHistory: InvoiceItem[];
  usage: {
    calls: UsageData;
    transcriptions: UsageData;
    storage: UsageData;
  };
}

export const useBillingData = () => {
  const { user } = useAuth();
  const { tier } = useSubscription();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [billingData, setBillingData] = useState<BillingData | null>(null);

  useEffect(() => {
    const fetchBillingData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // In a real app, we would fetch data from Supabase tables
        // For now, simulate a fetch with a timeout
        setTimeout(() => {
          // Sample data based on subscription tier
          const getPlanDetails = (): PlanDetails => {
            switch (tier) {
              case 'starter':
                return {
                  name: "Starter",
                  price: "$299",
                  billingCycle: "monthly",
                  features: [
                    "500 calls per month",
                    "Basic transcriptions",
                    "5GB storage",
                    "Email support",
                    "Basic analytics"
                  ]
                };
              case 'professional':
                return {
                  name: "Professional",
                  price: "$599",
                  billingCycle: "monthly",
                  features: [
                    "1500 calls per month",
                    "Unlimited transcriptions",
                    "10GB storage",
                    "Email & phone support",
                    "Advanced analytics"
                  ]
                };
              case 'enterprise':
                return {
                  name: "Enterprise",
                  price: "$1,299",
                  billingCycle: "monthly",
                  features: [
                    "Unlimited calls",
                    "Unlimited transcriptions",
                    "50GB storage",
                    "Priority support",
                    "Custom analytics"
                  ]
                };
              default:
                return {
                  name: "Starter",
                  price: "$299",
                  billingCycle: "monthly",
                  features: [
                    "500 calls per month",
                    "Basic transcriptions",
                    "5GB storage",
                    "Email support",
                    "Basic analytics"
                  ]
                };
            }
          };
          
          const getUsageData = () => {
            switch (tier) {
              case 'starter':
                return {
                  calls: {
                    currentUsage: 42,
                    limit: 500,
                    percentage: 8
                  },
                  transcriptions: {
                    currentUsage: 38,
                    limit: 1000,
                    percentage: 3.8
                  },
                  storage: {
                    currentUsage: 1.2,
                    limit: 5,
                    percentage: 24
                  }
                };
              case 'professional':
                return {
                  calls: {
                    currentUsage: 423,
                    limit: 1500,
                    percentage: 28
                  },
                  transcriptions: {
                    currentUsage: 398,
                    limit: 0,
                    percentage: 0
                  },
                  storage: {
                    currentUsage: 3.2,
                    limit: 10,
                    percentage: 32
                  }
                };
              case 'enterprise':
                return {
                  calls: {
                    currentUsage: 1235,
                    limit: 0,
                    percentage: 0
                  },
                  transcriptions: {
                    currentUsage: 1102,
                    limit: 0,
                    percentage: 0
                  },
                  storage: {
                    currentUsage: 12.7,
                    limit: 50,
                    percentage: 25
                  }
                };
              default:
                return {
                  calls: {
                    currentUsage: 42,
                    limit: 500,
                    percentage: 8
                  },
                  transcriptions: {
                    currentUsage: 38,
                    limit: 1000,
                    percentage: 3.8
                  },
                  storage: {
                    currentUsage: 1.2,
                    limit: 5,
                    percentage: 24
                  }
                };
            }
          };
          
          const sampleData: BillingData = {
            currentPlan: getPlanDetails(),
            renewalDate: "May 15, 2025",
            paymentMethods: [
              {
                id: "pm_1",
                type: "visa",
                last4: "4242",
                expiryMonth: "12",
                expiryYear: "2025",
                isDefault: true
              },
              {
                id: "pm_2",
                type: "mastercard",
                last4: "8888",
                expiryMonth: "08",
                expiryYear: "2026",
                isDefault: false
              }
            ],
            invoiceHistory: [
              { id: "inv_123", date: "April 15, 2025", amount: "$299.00", status: "paid" },
              { id: "inv_122", date: "March 15, 2025", amount: "$299.00", status: "paid" },
              { id: "inv_121", date: "February 15, 2025", amount: "$299.00", status: "paid" },
              { id: "inv_120", date: "January 15, 2025", amount: "$199.00", status: "paid" },
              { id: "inv_119", date: "December 15, 2024", amount: "$199.00", status: "paid" }
            ],
            usage: getUsageData()
          };
          
          setBillingData(sampleData);
          setIsLoading(false);
        }, 500);
        
      } catch (err: any) {
        console.error("Error fetching billing data:", err);
        setError(err.message || "Failed to load billing data");
        setIsLoading(false);
      }
    };
    
    fetchBillingData();
  }, [user, tier]);
  
  return { 
    billingData, 
    isLoading, 
    error 
  };
};
