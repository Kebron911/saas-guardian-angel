
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AdminRevenue {
  name: string;
  revenue: number;
}

interface AdminSubscription {
  name: string;
  value: number;
  color: string;
}

export function useAdminDashboardData() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [revenueData, setRevenueData] = useState<AdminRevenue[]>([]);
  const [subscriptionsData, setSubscriptionsData] = useState<AdminSubscription[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!auth.user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // Check if user has admin role
        const { data: roleData, error: roleError } = await supabase
          .rpc('has_role', { 
            _user_id: auth.user.id,
            _role: 'admin'
          });
          
        if (roleError) throw roleError;
        
        if (!roleData) {
          setError('User does not have admin permissions');
          setIsLoading(false);
          return;
        }
        
        // Fetch subscriptions data
        const { data: subscriptionsRawData, error: subscriptionsError } = await supabase
          .from('subscriptions')
          .select('plan_type')
          .not('plan_type', 'is', null);
          
        if (subscriptionsError) throw subscriptionsError;
        
        // Process subscription data
        const plans: Record<string, { count: number, color: string }> = {
          'basic': { count: 0, color: '#1A237E' },
          'pro': { count: 0, color: '#00B8D4' },
          'enterprise': { count: 0, color: '#FF6F61' }
        };
        
        subscriptionsRawData.forEach(subscription => {
          const plan = subscription.plan_type?.toLowerCase() || 'basic';
          if (plans[plan]) {
            plans[plan].count += 1;
          } else {
            plans[plan] = { count: 1, color: '#7986CB' };
          }
        });
        
        const formattedSubscriptions = Object.entries(plans).map(([name, data]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1) + ' Plan',
          value: data.count,
          color: data.color
        }));
        
        // Generate sample revenue data (this would come from actual payment data in production)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
        const revData: AdminRevenue[] = [];
        
        months.forEach((month, index) => {
          // Generate realistic increasing revenue trend
          const baseRevenue = 10000 + (index * 2000);
          const variance = Math.floor(Math.random() * 3000) - 1000;
          revData.push({
            name: month,
            revenue: baseRevenue + variance
          });
        });
        
        setRevenueData(revData);
        setSubscriptionsData(formattedSubscriptions);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching admin dashboard data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAdminData();
  }, [auth.user?.id]);
  
  return { revenueData, subscriptionsData, isLoading, error };
}
