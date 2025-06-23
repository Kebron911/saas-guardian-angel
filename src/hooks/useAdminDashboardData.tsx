
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardStats {
  total_users: number;
  total_affiliates: number;
  active_subscriptions: number;
  monthly_revenue: number;
  commissions_paid: number;
  open_tickets: number;
}

interface RevenueData {
  name: string;
  revenue: number;
}

interface SubscriptionData {
  name: string;
  value: number;
  color: string;
}

interface ActivityData {
  id: string;
  event_type: string;
  performed_by_email: string;
  details: string;
  timestamp: string;
  ip_address: string;
}

export const useAdminDashboardData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<AdminDashboardStats>({
    total_users: 0,
    total_affiliates: 0,
    active_subscriptions: 0,
    monthly_revenue: 0,
    commissions_paid: 0,
    open_tickets: 0
  });
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [subscriptionsData, setSubscriptionsData] = useState<SubscriptionData[]>([]);
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch dashboard stats
        const statsData = await apiClient.get('/admin/dashboard-stats');
        setStats(statsData);
        
        // Fetch revenue data (last 6 months)
        const revenueResult = await apiClient.get('/admin/revenue-chart');
        setRevenueData(revenueResult);
        
        // Fetch subscription distribution
        const subscriptionResult = await apiClient.get('/admin/subscription-chart');
        setSubscriptionsData(subscriptionResult);
        
        // Fetch recent admin activity
        const activityResult = await apiClient.get('/admin/admin-activity');
        setActivityData(activityResult);
        
      } catch (err: any) {
        console.error("Error fetching admin dashboard data:", err);
        setError(err.message || "Failed to load dashboard data");
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  return { 
    isLoading, 
    error, 
    stats,
    revenueData,
    subscriptionsData,
    activityData
  };
};
