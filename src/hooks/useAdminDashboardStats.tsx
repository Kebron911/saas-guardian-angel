import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

export interface AdminDashboardStats {
  total_users: number;
  total_affiliates: number;
  affiliates_breakdown: {
    today: number;
    week: number;
    month: number;
    year: number;
  };
  total_referrals: number;
  referrals_breakdown: {
    today: number;
    week: number;
    month: number;
    year: number;
  };
  active_subscriptions: number;
  active_subscriptions_breakdown: {
    today: number;
    week: number;
    month: number;
    year: number;
  };
  monthly_revenue: number;
  commissions_paid: number;
  open_tickets: number;
  promo_usage: number;
  promo_usage_breakdown: {
    today: number;
    week: number;
    month: number;
    year: number;
  };
}

export const useAdminDashboardStats = () => {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiClient.get("/admin/dashboard-stats");
        setStats(result);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard stats");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, isLoading, error };
};
