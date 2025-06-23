
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface CallBreakdownData {
  name: string;
  value: number;
}

interface PerformanceData {
  metric: string;
  score: number;
  total: number;
}

interface HeatmapData {
  hour: number;
  day: number;
  value: number;
}

interface TrendData {
  date: string;
  calls: number;
  answered: number;
  voicemail: number;
  bookings: number;
}

interface TopCallerData {
  id: number;
  name: string;
  phoneNumber: string;
  callCount: number;
  lastCalled: string;
}

interface ReportData {
  callBreakdown: CallBreakdownData[];
  performance: PerformanceData[];
  heatmap: HeatmapData[];
  trend: TrendData[];
  topCallers: TopCallerData[];
  totalCalls: number;
}

export const useReportData = (filter: string = 'month') => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // In a real app, we would fetch data from Supabase tables
        // For now, simulate a fetch with a timeout
        setTimeout(() => {
          // Sample data
          const sampleData: ReportData = {
            callBreakdown: [
              { name: 'Answered', value: 42 },
              { name: 'Voicemail', value: 28 },
              { name: 'Missed', value: 18 },
              { name: 'Blocked', value: 12 },
            ],
            performance: [
              { metric: 'Response Time', score: 92, total: 100 },
              { metric: 'Call Quality', score: 87, total: 100 },
              { metric: 'Customer Satisfaction', score: 94, total: 100 },
              { metric: 'Booking Rate', score: 76, total: 100 },
            ],
            heatmap: Array.from({ length: 7 * 24 }, (_, i) => ({
              day: Math.floor(i / 24),
              hour: i % 24,
              value: Math.floor(Math.random() * 10)
            })),
            trend: [
              { date: 'Mon', calls: 24, answered: 18, voicemail: 4, bookings: 12 },
              { date: 'Tue', calls: 32, answered: 28, voicemail: 3, bookings: 15 },
              { date: 'Wed', calls: 29, answered: 24, voicemail: 4, bookings: 13 },
              { date: 'Thu', calls: 35, answered: 30, voicemail: 4, bookings: 18 },
              { date: 'Fri', calls: 40, answered: 32, voicemail: 6, bookings: 20 },
              { date: 'Sat', calls: 18, answered: 15, voicemail: 2, bookings: 8 },
              { date: 'Sun', calls: 12, answered: 10, voicemail: 1, bookings: 5 },
            ],
            topCallers: [
              { id: 1, name: 'John Smith', phoneNumber: '+1 (555) 123-4567', callCount: 12, lastCalled: '2025-04-28' },
              { id: 2, name: 'Sarah Johnson', phoneNumber: '+1 (555) 234-5678', callCount: 9, lastCalled: '2025-04-27' },
              { id: 3, name: 'Michael Brown', phoneNumber: '+1 (555) 345-6789', callCount: 7, lastCalled: '2025-04-25' },
              { id: 4, name: 'Lisa Davis', phoneNumber: '+1 (555) 456-7890', callCount: 5, lastCalled: '2025-04-24' },
              { id: 5, name: 'Robert Wilson', phoneNumber: '+1 (555) 567-8901', callCount: 4, lastCalled: '2025-04-22' },
            ],
            totalCalls: 190
          };
          
          setReportData(sampleData);
          setIsLoading(false);
        }, 500);
        
      } catch (err: any) {
        console.error("Error fetching report data:", err);
        setError(err.message || "Failed to load report data");
        setIsLoading(false);
      }
    };
    
    fetchReportData();
  }, [user, filter]);
  
  return { 
    reportData, 
    isLoading, 
    error 
  };
};
