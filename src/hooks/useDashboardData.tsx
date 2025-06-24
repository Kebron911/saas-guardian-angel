
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface CallTrend {
  date: string;
  incoming: number;
  outgoing: number;
  bookings: number;
}

export interface DashboardStats {
  totalCalls: number;
  avgDuration: string;
  bookingsMade: number;
  missedCallsRecovered: number;
  assistantUptime: string;
}

export const useDashboardData = () => {
  const [callTrends, setCallTrends] = useState<CallTrend[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalCalls: 0,
    avgDuration: "0m",
    bookingsMade: 0,
    missedCallsRecovered: 0,
    assistantUptime: "99.9%"
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching dashboard data from Supabase...");
      
      // Fetch calls data from Supabase
      const { data: calls, error: callsError } = await supabase
        .from("calls")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (callsError) {
        console.error("Error fetching calls:", callsError);
      }

      // Generate sample data since we don't have real data yet
      const sampleTrends: CallTrend[] = [
        { date: "2024-06-20", incoming: 45, outgoing: 12, bookings: 8 },
        { date: "2024-06-21", incoming: 52, outgoing: 15, bookings: 12 },
        { date: "2024-06-22", incoming: 38, outgoing: 9, bookings: 6 },
        { date: "2024-06-23", incoming: 61, outgoing: 18, bookings: 15 },
        { date: "2024-06-24", incoming: 49, outgoing: 13, bookings: 9 }
      ];

      const sampleStats: DashboardStats = {
        totalCalls: calls?.length || 245,
        avgDuration: "3m 42s",
        bookingsMade: 50,
        missedCallsRecovered: 23,
        assistantUptime: "99.9%"
      };

      setCallTrends(sampleTrends);
      setStats(sampleStats);
      
    } catch (err: any) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    callTrends,
    stats,
    isLoading,
    refetch: fetchData
  };
};
