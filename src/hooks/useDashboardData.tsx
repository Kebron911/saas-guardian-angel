import { useState, useEffect } from "react";
import { DatabaseInterface } from '@/database_interface';
import { useAuth } from "@/contexts/AuthContext";

interface CallTrend {
  day: string;
  calls: number;
  bookings: number;
}

interface DashboardStats {
  totalCalls: number;
  avgDuration: string;
  bookingsMade: number;
  missedCallsRecovered: number;
  assistantUptime: string;
}

const sampleData = [
  { day: '2024-01-01', calls: 24, bookings: 8, user_id: '' },
  { day: '2024-01-02', calls: 31, bookings: 12, user_id: '' },
  { day: '2024-01-03', calls: 28, bookings: 10, user_id: '' },
  { day: '2024-01-04', calls: 35, bookings: 15, user_id: '' },
  { day: '2024-01-05', calls: 42, bookings: 18, user_id: '' }
];

export const useDashboardData = (filter: string = 'month') => {
  const [isLoading, setIsLoading] = useState(true);
  const [callTrends, setCallTrends] = useState<CallTrend[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalCalls: 0,
    avgDuration: '',
    bookingsMade: 0,
    missedCallsRecovered: 0,
    assistantUptime: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        let data = await DatabaseInterface.select('sample_calls', { user_id: user.id });
        
        if (!data || data.length === 0) {
          // Insert sample data if none exists
          console.log("No dashboard data found, inserting samples...");
          const samplesWithUserId = sampleData.map(item => ({ ...item, user_id: user.id }));
          for (const sample of samplesWithUserId) {
            await DatabaseInterface.insert('sample_calls', sample);
          }
          data = await DatabaseInterface.select('sample_calls', { user_id: user.id });
        }

        if (data && data.length > 0) {
          const trends = data.map(item => ({
            day: item.day,
            calls: item.calls,
            bookings: item.bookings
          }));
          
          setCallTrends(trends);
          
          // Calculate stats from the data
          const totalCalls = trends.reduce((sum, item) => sum + item.calls, 0);
          const totalBookings = trends.reduce((sum, item) => sum + item.bookings, 0);
          
          setStats({
            totalCalls,
            avgDuration: '2:47',
            bookingsMade: totalBookings,
            missedCallsRecovered: Math.floor(totalCalls * 0.12),
            assistantUptime: '99.9%'
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setCallTrends([]);
        setStats({
          totalCalls: 0,
          avgDuration: '0:00',
          bookingsMade: 0,
          missedCallsRecovered: 0,
          assistantUptime: '0%'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchData();
    }
  }, [filter, user]);

  return { callTrends, stats, isLoading };
};
