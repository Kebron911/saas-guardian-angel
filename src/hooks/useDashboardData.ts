
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardStats {
  totalCalls: number;
  avgDuration: string;
  bookingsMade: number;
  missedCallsRecovered: number;
  assistantUptime: string;
}

interface CallTrend {
  day: string;
  calls: number;
  bookings: number;
}

export function useDashboardData() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalCalls: 0,
    avgDuration: '0m 0s',
    bookingsMade: 0,
    missedCallsRecovered: 0,
    assistantUptime: '0%'
  });
  const [callTrends, setCallTrends] = useState<CallTrend[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!auth.user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // Fetch total calls count
        const { data: callsData, error: callsError } = await supabase
          .from('calls')
          .select('id, duration')
          .eq('user_id', auth.user.id);
        
        if (callsError) throw callsError;
        
        // Calculate stats from calls data
        const totalCalls = callsData.length;
        
        // Calculate average duration
        const totalDuration = callsData.reduce((sum, call) => {
          return sum + (call.duration || 0);
        }, 0);
        
        const avgSeconds = totalCalls > 0 ? Math.floor(totalDuration / totalCalls) : 0;
        const avgMinutes = Math.floor(avgSeconds / 60);
        const remainingSeconds = avgSeconds % 60;
        const avgDuration = `${avgMinutes}m ${remainingSeconds}s`;
        
        // Count bookings (this is a placeholder - you would need a bookings table or a field in calls)
        const bookingsMade = Math.floor(totalCalls * 0.3); // Simulating 30% booking rate
        
        // Missed calls recovered (placeholder)
        const missedCallsRecovered = Math.floor(totalCalls * 0.1); // Simulating 10% recovery rate
        
        // Generate call trends for the last 7 days
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const trends: CallTrend[] = [];
        
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dayName = days[date.getDay()];
          
          // Count calls for this day (would be better with a proper date range query)
          const dayCallCount = Math.floor(Math.random() * 40) + 10; // Placeholder
          const bookingsCount = Math.floor(dayCallCount * 0.4); // Simulating 40% booking rate
          
          trends.push({
            day: dayName,
            calls: dayCallCount,
            bookings: bookingsCount
          });
        }
        
        setStats({
          totalCalls,
          avgDuration,
          bookingsMade,
          missedCallsRecovered,
          assistantUptime: '99.9%'
        });
        
        setCallTrends(trends);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [auth.user?.id]);
  
  return { stats, callTrends, isLoading, error };
}
