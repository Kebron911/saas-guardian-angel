
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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
        
        console.log("Fetching admin dashboard data from Supabase...");
        
        // Fetch users count
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        // Fetch affiliates count
        const { count: affiliatesCount } = await supabase
          .from('affiliates')
          .select('*', { count: 'exact', head: true });
        
        // Fetch active subscriptions count
        const { count: subscriptionsCount } = await supabase
          .from('subscriptions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');
        
        // Calculate commission from referrals
        const { data: referralsData } = await supabase
          .from('referrals')
          .select('commission_amount')
          .eq('status', 'converted');
        
        const totalCommissions = referralsData?.reduce(
          (sum, r) => sum + (r.commission_amount || 0), 0
        ) || 0;
        
        setStats({
          total_users: usersCount || 0,
          total_affiliates: affiliatesCount || 0,
          active_subscriptions: subscriptionsCount || 0,
          monthly_revenue: 0, // Can be calculated from actual revenue data when available
          commissions_paid: totalCommissions,
          open_tickets: 0 // Can be calculated from support tickets when available
        });
        
        // Generate sample revenue data for the chart
        const sampleRevenue = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          sampleRevenue.push({
            name: monthName,
            revenue: Math.floor(Math.random() * 10000) + 5000
          });
        }
        setRevenueData(sampleRevenue);
        
        // Generate sample subscription data
        setSubscriptionsData([
          { name: "Basic", value: 45, color: "#3B82F6" },
          { name: "Pro", value: 30, color: "#10B981" },
          { name: "Premium", value: 25, color: "#8B5CF6" }
        ]);
        
        // Generate sample activity data
        setActivityData([
          {
            id: "1",
            event_type: "user_created",
            performed_by_email: "admin@example.com",
            details: "New user account created",
            timestamp: new Date().toISOString(),
            ip_address: "192.168.1.1"
          }
        ]);
        
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
