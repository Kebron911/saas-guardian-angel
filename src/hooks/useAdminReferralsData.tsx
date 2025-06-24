
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

export interface ReferralAffiliate {
  id: string;
  user_id: string;
  name: string;
  email: string;
  referral_code: string;
  commission_rate: number;
  total_referrals: number;
  total_earnings: number;
  created_at: string;
  updated_at: string;
}

export interface ReferralPayout {
  id: string;
  affiliate_id: string;
  affiliate_name: string;
  email: string;
  referral_code: string;
  amount: number;
  status: string;
  payment_method: string;
  referral_count: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ReferralStats {
  total_affiliates: number;
  total_referrals: number;
  total_revenue: number;
  total_commissions: number;
}

export const useAdminReferralsData = () => {
  const [affiliates, setAffiliates] = useState<ReferralAffiliate[]>([]);
  const [filteredAffiliates, setFilteredAffiliates] = useState<ReferralAffiliate[]>([]);
  const [payouts, setPayouts] = useState<ReferralPayout[]>([]);
  const [filteredPayouts, setFilteredPayouts] = useState<ReferralPayout[]>([]);
  const [stats, setStats] = useState<ReferralStats>({
    total_affiliates: 0,
    total_referrals: 0,
    total_revenue: 0,
    total_commissions: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Affiliates filters
  const [affiliateSearchTerm, setAffiliateSearchTerm] = useState('');
  const [affiliateSortBy, setAffiliateSortBy] = useState('created_at');
  const [affiliateSortDirection, setAffiliateSortDirection] = useState<'asc' | 'desc'>('desc');
  const [affiliateCommissionFilter, setAffiliateCommissionFilter] = useState('all');

  // Payouts filters
  const [payoutSearchTerm, setPayoutSearchTerm] = useState('');
  const [payoutStatusFilter, setPayoutStatusFilter] = useState('all');
  const [payoutSortBy, setPayoutSortBy] = useState('created_at');
  const [payoutSortDirection, setPayoutSortDirection] = useState<'asc' | 'desc'>('desc');
  const [payoutDateRange, setPayoutDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });

  const fetchAffiliates = async () => {
    try {
      console.log("Fetching affiliates from PostgreSQL API...");
      
      const data = await apiClient.get(`/admin/affiliates`);
      console.log("Affiliates fetched:", data);
      
      setAffiliates(data || []);
    } catch (err: any) {
      console.error("Error fetching affiliates:", err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load affiliates data",
        variant: "destructive"
      });
    }
  };

  const fetchPayouts = async () => {
    try {
      console.log("Fetching referral payouts from PostgreSQL API...");
      
      const data = await apiClient.get(`/admin/referral-payouts`);
      console.log("Referral payouts fetched:", data);
      
      setPayouts(data || []);
    } catch (err: any) {
      console.error("Error fetching referral payouts:", err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load referral payouts data",
        variant: "destructive"
      });
    }
  };

  const fetchStats = async () => {
    try {
      console.log("Fetching referral stats from PostgreSQL API...");
      
      const data = await apiClient.get('/admin/referral-stats');
      console.log("Referral stats fetched:", data);
      
      setStats(data || {
        total_affiliates: 0,
        total_referrals: 0,
        total_revenue: 0,
        total_commissions: 0
      });
    } catch (err: any) {
      console.error("Error fetching referral stats:", err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load referral stats",
        variant: "destructive"
      });
    }
  };

  // Filter affiliates
  useEffect(() => {
    let filtered = [...affiliates];

    if (affiliateSearchTerm) {
      filtered = filtered.filter(affiliate => 
        affiliate.name.toLowerCase().includes(affiliateSearchTerm.toLowerCase()) ||
        affiliate.email.toLowerCase().includes(affiliateSearchTerm.toLowerCase()) ||
        affiliate.referral_code.toLowerCase().includes(affiliateSearchTerm.toLowerCase())
      );
    }

    if (affiliateCommissionFilter !== 'all') {
      if (affiliateCommissionFilter === 'high') {
        filtered = filtered.filter(affiliate => affiliate.commission_rate >= 0.2);
      } else if (affiliateCommissionFilter === 'medium') {
        filtered = filtered.filter(affiliate => affiliate.commission_rate >= 0.1 && affiliate.commission_rate < 0.2);
      } else if (affiliateCommissionFilter === 'low') {
        filtered = filtered.filter(affiliate => affiliate.commission_rate < 0.1);
      }
    }

    filtered.sort((a, b) => {
      let aValue: any = a[affiliateSortBy as keyof ReferralAffiliate];
      let bValue: any = b[affiliateSortBy as keyof ReferralAffiliate];

      if (affiliateSortBy === 'created_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return affiliateSortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return affiliateSortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredAffiliates(filtered);
  }, [affiliates, affiliateSearchTerm, affiliateSortBy, affiliateSortDirection, affiliateCommissionFilter]);

  // Filter payouts
  useEffect(() => {
    let filtered = [...payouts];

    if (payoutSearchTerm) {
      filtered = filtered.filter(payout => 
        payout.affiliate_name.toLowerCase().includes(payoutSearchTerm.toLowerCase()) ||
        payout.email.toLowerCase().includes(payoutSearchTerm.toLowerCase())
      );
    }

    if (payoutStatusFilter !== 'all') {
      filtered = filtered.filter(payout => payout.status === payoutStatusFilter);
    }

    if (payoutDateRange.from || payoutDateRange.to) {
      filtered = filtered.filter(payout => {
        const payoutDate = new Date(payout.created_at);
        const fromDate = payoutDateRange.from;
        const toDate = payoutDateRange.to;
        
        if (fromDate && toDate) {
          return payoutDate >= fromDate && payoutDate <= toDate;
        } else if (fromDate) {
          return payoutDate >= fromDate;
        } else if (toDate) {
          return payoutDate <= toDate;
        }
        return true;
      });
    }

    filtered.sort((a, b) => {
      let aValue: any = a[payoutSortBy as keyof ReferralPayout];
      let bValue: any = b[payoutSortBy as keyof ReferralPayout];

      if (payoutSortBy === 'created_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (payoutSortBy === 'amount') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (aValue < bValue) return payoutSortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return payoutSortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredPayouts(filtered);
  }, [payouts, payoutSearchTerm, payoutStatusFilter, payoutSortBy, payoutSortDirection, payoutDateRange]);

  const updatePayoutStatus = async (payoutId: string, status: string) => {
    try {
      console.log(`Updating payout ${payoutId} status to ${status}`);
      
      const response = await fetch(`http://localhost:8000/admin/referral-payouts/${payoutId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      await fetchPayouts();
      await fetchStats();
      
      toast({
        title: "Success",
        description: "Payout status updated successfully"
      });
    } catch (err: any) {
      console.error("Error updating payout status:", err);
      toast({
        title: "Error",
        description: "Failed to update payout status",
        variant: "destructive"
      });
      throw err;
    }
  };

  const clearAffiliateFilters = () => {
    setAffiliateSearchTerm('');
    setAffiliateSortBy('created_at');
    setAffiliateSortDirection('desc');
    setAffiliateCommissionFilter('all');
  };

  const clearPayoutFilters = () => {
    setPayoutSearchTerm('');
    setPayoutStatusFilter('all');
    setPayoutSortBy('created_at');
    setPayoutSortDirection('desc');
    setPayoutDateRange({ from: undefined, to: undefined });
  };

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await Promise.all([
        fetchAffiliates(),
        fetchPayouts(),
        fetchStats()
      ]);
    } catch (err: any) {
      console.error("Error fetching referral data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return {
    affiliates: filteredAffiliates,
    payouts: filteredPayouts,
    stats,
    isLoading,
    error,
    updatePayoutStatus,
    fetchAllData,
    // Affiliate filters
    affiliateSearchTerm,
    setAffiliateSearchTerm,
    affiliateSortBy,
    setAffiliateSortBy,
    affiliateSortDirection,
    setAffiliateSortDirection,
    affiliateCommissionFilter,
    setAffiliateCommissionFilter,
    clearAffiliateFilters,
    // Payout filters
    payoutSearchTerm,
    setPayoutSearchTerm,
    payoutStatusFilter,
    setPayoutStatusFilter,
    payoutSortBy,
    setPayoutSortBy,
    payoutSortDirection,
    setPayoutSortDirection,
    payoutDateRange,
    setPayoutDateRange,
    clearPayoutFilters
  };
};
