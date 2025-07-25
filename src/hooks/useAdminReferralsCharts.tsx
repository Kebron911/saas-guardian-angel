import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export const useReferralsOverTime = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiClient.get("/admin/referrals-over-time").then(setData).finally(() => setLoading(false));
  }, []);
  return { data, loading };
};

export const useTopAffiliates = () => {
  const [data, setData] = useState<{ id: string; name: string; referrals: number }[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiClient.get("/admin/top-affiliates")
      .then((res) => Array.isArray(res)
        ? setData(res.map((a: any) => ({ id: a.id, name: a.name || a.email || 'Unknown', referrals: a.referrals || 0 })))
        : setData([]))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
};

export const useReferralConversionRate = () => {
  const [rate, setRate] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiClient.get("/admin/referral-conversion-rate").then((res) => setRate(res.conversion_rate)).finally(() => setLoading(false));
  }, []);
  return { rate, loading };
};

export const useCommissionsOverTime = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiClient.get("/admin/commissions-over-time").then(setData).finally(() => setLoading(false));
  }, []);
  return { data, loading };
};
