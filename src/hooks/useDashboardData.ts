
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { addDays, format, subDays, subMonths } from 'date-fns';

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

export function useDashboardData(filter = 'month') {
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
        
        // Set date range based on filter
        let startDate = new Date();
        if (filter === 'month') {
          startDate = subMonths(new Date(), 1);
        } else if (filter === 'week') {
          startDate = subDays(new Date(), 7);
        } else {
          // Custom filter - default to last 30 days
          startDate = subDays(new Date(), 30);
        }
        
        // Format date for Supabase query
        const formattedStartDate = startDate.toISOString();
        
        // Fetch all calls within the date range
        const { data: callsData, error: callsError } = await supabase
          .from('calls')
          .select('id, duration, status, created_at')
          .gte('created_at', formattedStartDate)
          .order('created_at', { ascending: false });

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
        
        // Count bookings (for demo, we'll assume calls with duration > 60 seconds led to bookings)
        const bookingsMade = callsData.filter(call => (call.duration || 0) > 60).length;
        
        // Count missed calls recovered (calls that were initially missed but had follow-up)
        const missedCallsRecovered = callsData.filter(call => 
          call.status === 'missed' && callsData.some(c => 
            c.created_at > call.created_at
          )
        ).length;
        
        // Generate call trends for the last 7 days (or based on filter)
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const trends: CallTrend[] = [];
        
        const today = new Date();
        const daysToShow = filter === 'week' ? 7 : 14;
        
        for (let i = daysToShow - 1; i >= 0; i--) {
          const date = subDays(today, i);
          const dayName = days[date.getDay()];
          const dayFormatted = format(date, 'yyyy-MM-dd');
          
          // Count calls for this day
          const dayCalls = callsData.filter(call => {
            const callDate = new Date(call.created_at);
            return format(callDate, 'yyyy-MM-dd') === dayFormatted;
          });
          
          const dayCallCount = dayCalls.length;
          const bookingsCount = dayCalls.filter(call => (call.duration || 0) > 60).length;
          
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
          assistantUptime: '99.9%'  // This could be calculated from actual service uptime data
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
  }, [auth.user?.id, filter]);
  
  return { stats, callTrends, isLoading, error };
}
