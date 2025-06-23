
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface PayoutItem {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Processing" | "Pending";
  method: string;
  referrals: number;
}

interface PayoutsData {
  totalEarned: number;
  pendingAmount: number;
  nextPayoutDate: string;
  lifetimeReferrals: {
    total: number;
    tier1: number;
    tier2: number;
  };
  paymentMethod: string;
  paymentEmail: string;
  minimumThreshold: number;
  paymentSchedule: string;
  payoutHistory: PayoutItem[];
}

export const useAffiliatePayouts = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payoutsData, setPayoutsData] = useState<PayoutsData | null>(null);

  useEffect(() => {
    const fetchPayoutsData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // In a real app, we would fetch data from Supabase tables
        // For now, simulate a fetch with a timeout
        setTimeout(() => {
          // Sample data
          const sampleData: PayoutsData = {
            totalEarned: 792,
            pendingAmount: 168,
            nextPayoutDate: "May 1, 2025",
            lifetimeReferrals: {
              total: 18,
              tier1: 14,
              tier2: 4,
            },
            paymentMethod: "PayPal",
            paymentEmail: "j****n@gmail.com",
            minimumThreshold: 100,
            paymentSchedule: "Monthly (1st of month)",
            payoutHistory: [
              { id: "PAY-8742", date: "Apr 01, 2025", amount: "$240.00", status: "Paid", method: "PayPal", referrals: 5 },
              { id: "PAY-6531", date: "Mar 01, 2025", amount: "$176.00", status: "Paid", method: "PayPal", referrals: 4 },
              { id: "PAY-5243", date: "Feb 01, 2025", amount: "$112.00", status: "Paid", method: "PayPal", referrals: 3 },
              { id: "PAY-4128", date: "Jan 01, 2025", amount: "$96.00", status: "Paid", method: "PayPal", referrals: 2 },
              { id: "PAY-3097", date: "May 01, 2025", amount: "$168.00", status: "Pending", method: "PayPal", referrals: 4 },
            ],
          };
          
          setPayoutsData(sampleData);
          setIsLoading(false);
        }, 500);
        
      } catch (err: any) {
        console.error("Error fetching affiliate payouts data:", err);
        setError(err.message || "Failed to load affiliate payouts data");
        setIsLoading(false);
      }
    };
    
    fetchPayoutsData();
  }, [user]);
  
  return { 
    payoutsData, 
    isLoading, 
    error 
  };
};
