
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

export interface FinanceDashboardStats {
  monthlyRevenue: number;
  activeSubscriptions: number;
  promoUsage: number;
  totalPayouts: number;
}

export interface RevenueTimelineData {
  name: string;
  revenue: number;
}

export interface RevenuePlanData {
  name: string;
  revenue: number;
  invoice_count: number;
}

export const useFinanceDashboard = () => {
  const [stats, setStats] = useState<FinanceDashboardStats>({
    monthlyRevenue: 0,
    activeSubscriptions: 0,
    promoUsage: 0,
    totalPayouts: 0,
  });
  
  const [revenueTimeline, setRevenueTimeline] = useState<RevenueTimelineData[]>([]);
  const [revenuePlanData, setRevenuePlanData] = useState<RevenuePlanData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchDashboardStats = async () => {
    try {
      console.log("Fetching finance dashboard stats from PostgreSQL API...");
      
      const [
        monthlyRevenueRes,
        activeSubscriptionsRes,
        promoUsageRes,
        totalPayoutsRes
      ] = await Promise.all([
        apiClient.get('/admin/finance/dashboard/monthly-revenue'),
        apiClient.get('/admin/finance/dashboard/active-subscriptions'),
        apiClient.get('/admin/finance/dashboard/promo-usage'),
        apiClient.get('/admin/finance/dashboard/total-payouts')
      ]);

      console.log("Dashboard stats fetched:", {
        monthlyRevenueRes,
        activeSubscriptionsRes,
        promoUsageRes,
        totalPayoutsRes
      });

      setStats({
        monthlyRevenue: monthlyRevenueRes.monthly_revenue || 0,
        activeSubscriptions: activeSubscriptionsRes.active_subscriptions || 0,
        promoUsage: promoUsageRes.promo_usage || 0,
        totalPayouts: totalPayoutsRes.total_payouts || 0,
      });

    } catch (err: any) {
      console.error("Error fetching dashboard stats:", err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
        variant: "destructive"
      });
    }
  };

  const fetchRevenueTimeline = async () => {
    try {
      console.log("Fetching revenue timeline from PostgreSQL API...");
      
      const data = await apiClient.get('/admin/finance/dashboard/revenue-timeline');
      console.log("Revenue timeline fetched:", data);
      
      setRevenueTimeline(data || []);
    } catch (err: any) {
      console.error("Error fetching revenue timeline:", err);
      toast({
        title: "Error",
        description: "Failed to load revenue timeline",
        variant: "destructive"
      });
    }
  };

  const fetchRevenuePlanData = async () => {
    try {
      console.log("Fetching revenue by plan from PostgreSQL API...");
      
      const data = await apiClient.get('/admin/finance/dashboard/revenue-by-plan');
      console.log("Revenue by plan fetched:", data);
      
      setRevenuePlanData(data || []);
    } catch (err: any) {
      console.error("Error fetching revenue by plan:", err);
      toast({
        title: "Error",
        description: "Failed to load revenue by plan data",
        variant: "destructive"
      });
    }
  };

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await Promise.all([
        fetchDashboardStats(),
        fetchRevenueTimeline(),
        fetchRevenuePlanData()
      ]);
    } catch (err: any) {
      console.error("Error fetching finance dashboard data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return {
    stats,
    revenueTimeline,
    revenuePlanData,
    isLoading,
    error,
    fetchAllData
  };
};
