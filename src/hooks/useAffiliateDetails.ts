import { useState } from "react";
import { apiClient } from "@/lib/api-client";

export function useAffiliateDetails() {
  const [affiliate, setAffiliate] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAffiliate = async (affiliateId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get(`/admin/affiliate/${affiliateId}`);
      setAffiliate(data);
    } catch (e: any) {
      setError(e?.message || "Failed to fetch affiliate details");
      setAffiliate(null);
    } finally {
      setLoading(false);
    }
  };

  return { affiliate, loading, error, fetchAffiliate };
}
