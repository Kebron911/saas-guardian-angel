
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

export interface Transaction {
  id: string;
  user_id: string;
  user_name: string;
  email: string;
  amount: number;
  type: string;
  status: string;
  gateway: string;
  created_at: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  status: string;
  subscriber_count: number;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  user_name: string;
  plan_name: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  stripe_customer_id: string;
  auto_renew: boolean;
  created_at: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discount_percent: number;
  expiration_date: string | null;
  usage_count: number;
  max_uses: number | null;
  status: string;
  created_at: string;
}

export interface PromoCodeCreate {
  code: string;
  discount_percent: number;
  expiration_date?: string;
  max_uses?: number;
  status?: string;
}

export const useAdminFinanceData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTransactions = async (search?: string, type?: string, status?: string) => {
    try {
      console.log("Fetching transactions from PostgreSQL API...");
      
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (type && type !== 'all-types') params.append('type', type);
      if (status && status !== 'all-status') params.append('status', status);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      
      const data = await apiClient.get(`/admin/transactions${queryString}`);
      console.log("Transactions fetched:", data);
      
      setTransactions(data || []);
    } catch (err: any) {
      console.error("Error fetching transactions:", err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load transactions data",
        variant: "destructive"
      });
    }
  };

  const fetchPlans = async (search?: string, status?: string) => {
    try {
      console.log("Fetching plans from PostgreSQL API...");
      
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (status && status !== 'all-status') params.append('status', status);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      
      const data = await apiClient.get(`/admin/plans${queryString}`);
      console.log("Plans fetched:", data);
      
      setPlans(data || []);
    } catch (err: any) {
      console.error("Error fetching plans:", err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load plans data",
        variant: "destructive"
      });
    }
  };

  const fetchSubscriptions = async (search?: string, plan?: string, status?: string) => {
    try {
      console.log("Fetching subscriptions from PostgreSQL API...");
      
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (plan && plan !== 'all-plans') params.append('plan', plan);
      if (status && status !== 'all-status') params.append('status', status);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      
      const data = await apiClient.get(`/admin/subscriptions${queryString}`);
      console.log("Subscriptions fetched:", data);
      
      setSubscriptions(data || []);
    } catch (err: any) {
      console.error("Error fetching subscriptions:", err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load subscriptions data",
        variant: "destructive"
      });
    }
  };

  const fetchPromoCodes = async (search?: string, status?: string) => {
    try {
      console.log("Fetching promo codes from PostgreSQL API...");
      
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (status && status !== 'all-status') params.append('status', status);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      
      const data = await apiClient.get(`/admin/promo-codes${queryString}`);
      console.log("Promo codes fetched:", data);
      
      setPromoCodes(data || []);
    } catch (err: any) {
      console.error("Error fetching promo codes:", err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load promo codes data",
        variant: "destructive"
      });
    }
  };

  const createPromoCode = async (promoData: PromoCodeCreate) => {
    try {
      console.log("Creating promo code:", promoData);
      
      const data = await apiClient.post('/admin/promo-codes', promoData);
      console.log("Promo code created:", data);
      
      // Refresh promo codes list
      await fetchPromoCodes();
      
      toast({
        title: "Success",
        description: "Promo code created successfully"
      });
      
      return data;
    } catch (err: any) {
      console.error("Error creating promo code:", err);
      toast({
        title: "Error",
        description: "Failed to create promo code",
        variant: "destructive"
      });
      throw err;
    }
  };

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await Promise.all([
        fetchTransactions(),
        fetchPlans(),
        fetchSubscriptions(),
        fetchPromoCodes()
      ]);
    } catch (err: any) {
      console.error("Error fetching finance data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return {
    transactions,
    plans,
    subscriptions,
    promoCodes,
    isLoading,
    error,
    fetchTransactions,
    fetchPlans,
    fetchSubscriptions,
    fetchPromoCodes,
    createPromoCode,
    fetchAllData
  };
};
