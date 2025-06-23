import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/config";

export interface FinanceStats {
  total_revenue: number;
  monthly_revenue: number;
  commissions_paid: number;
  payouts: number;
}

export function useAdminFinanceDashboardData() {
  const [stats, setStats] = useState<FinanceStats>({
    total_revenue: 0,
    monthly_revenue: 0,
    commissions_paid: 0,
    payouts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [
          totalRevenueRes,
          monthlyRevenueRes,
          commissionsPaidRes,
          payoutsRes
        ] = await Promise.all([
          fetch(`${API_BASE_URL}/analytics/revenue-over-time`),
          fetch(`${API_BASE_URL}/analytics/monthly-revenue`),
          fetch(`${API_BASE_URL}/analytics/commissions-paid`),
          fetch(`${API_BASE_URL}/analytics/payouts`)
        ]);
        const totalRevenueData = await totalRevenueRes.json();
        const monthlyRevenueData = await monthlyRevenueRes.json();
        const commissionsPaidData = await commissionsPaidRes.json();
        const payoutsData = await payoutsRes.json();

        setStats({
          total_revenue: totalRevenueData?.total || 0,
          monthly_revenue: monthlyRevenueData?.monthly_revenue || 0,
          commissions_paid: commissionsPaidData?.commissions_paid || 0,
          payouts: Array.isArray(payoutsData) ? payoutsData.length : 0,
        });
      } catch (err) {
        setError("Failed to load finance dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, isLoading, error };
}
