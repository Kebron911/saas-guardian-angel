import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

export interface RevenueByPlanDatum {
  plan: string;
  revenue: number;
}

export const useRevenueByPlanData = () => {
  const [data, setData] = useState<RevenueByPlanDatum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiClient.get("/admin/revenue-by-plan");
        setData(result || []);
      } catch (err: any) {
        setError(err.message || "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, error };
};
