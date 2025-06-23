
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface PerformanceData {
  month: string;
  clicks: number;
  signups: number;
  conversions: number;
}

interface SourceData {
  source: string;
  percentage: number;
}

interface ConversionData {
  plan: string;
  conversions: number;
  totalPercentage: number;
}

interface AffiliatePerformanceData {
  totalClicks: number;
  totalSignups: number;
  totalConversions: number;
  conversionRate: number;
  monthlyChange: {
    clicks: number;
    signups: number;
    conversions: number;
    rate: number;
  };
  performanceTrend: PerformanceData[];
  trafficSources: SourceData[];
  conversionsByPlan: ConversionData[];
}

export const useAffiliatePerformance = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [performanceData, setPerformanceData] = useState<AffiliatePerformanceData | null>(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // In a real app, we would fetch data from Supabase tables
        // For now, simulate a fetch with a timeout
        setTimeout(() => {
          // Sample data
          const sampleData: AffiliatePerformanceData = {
            totalClicks: 1310,
            totalSignups: 334,
            totalConversions: 180,
            conversionRate: 13.7,
            monthlyChange: {
              clicks: 12.5,
              signups: 23.1,
              conversions: 17.8,
              rate: 2.1,
            },
            performanceTrend: [
              { month: 'Jan', clicks: 120, signups: 28, conversions: 15 },
              { month: 'Feb', clicks: 160, signups: 42, conversions: 22 },
              { month: 'Mar', clicks: 180, signups: 38, conversions: 18 },
              { month: 'Apr', clicks: 220, signups: 52, conversions: 25 },
              { month: 'May', clicks: 290, signups: 78, conversions: 42 },
              { month: 'Jun', clicks: 340, signups: 96, conversions: 58 },
            ],
            trafficSources: [
              { source: 'Social Media', percentage: 42 },
              { source: 'Direct Link', percentage: 28 },
              { source: 'Email', percentage: 18 },
              { source: 'Blog Posts', percentage: 12 },
            ],
            conversionsByPlan: [
              { plan: 'Professional Plan', conversions: 56, totalPercentage: 56 },
              { plan: 'Business Plan', conversions: 32, totalPercentage: 32 },
              { plan: 'Enterprise Plan', conversions: 12, totalPercentage: 12 },
            ],
          };
          
          setPerformanceData(sampleData);
          setIsLoading(false);
        }, 500);
        
      } catch (err: any) {
        console.error("Error fetching affiliate performance data:", err);
        setError(err.message || "Failed to load affiliate performance data");
        setIsLoading(false);
      }
    };
    
    fetchPerformanceData();
  }, [user]);
  
  return { 
    performanceData, 
    isLoading, 
    error 
  };
};
