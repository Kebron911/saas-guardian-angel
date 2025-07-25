import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

export interface FinanceStats {
  monthly_revenue: number;
  percent_change: number;
}

export const useFinanceStats = () => {
  const [stats, setStats] = useState<FinanceStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiClient.get("/admin/finance-stats");
        setStats(result);
      } catch (err: any) {
        setError(err.message || "Failed to load finance stats");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, isLoading, error };
};
