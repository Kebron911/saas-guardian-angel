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

export type SortField = 'name' | 'email' | 'referral_code' | 'total_referrals' | 'total_earnings' | 'created_at';
export type SortOrder = 'asc' | 'desc';

export const useAdminReferralsData = () => {
  const [affiliates, setAffiliates] = useState<ReferralAffiliate[]>([]);
  const [filteredAffiliates, setFilteredAffiliates] = useState<ReferralAffiliate[]>([]);
  const [payouts, setPayouts] = useState<ReferralPayout[]>([]);
  const [filteredPayouts, setFilteredPayouts] = useState<ReferralPayout[]>([]);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [stats, setStats] = useState<ReferralStats>({
    total_affiliates: 0,
    total_referrals: 0,
    total_revenue: 0,
    total_commissions: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const sortData = (data: ReferralAffiliate[], field: SortField, order: SortOrder) => {
    return [...data].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      
      if (field === 'created_at') {
        const aDate = new Date(aValue as string).getTime();
        const bDate = new Date(bValue as string).getTime();
        return order === 'asc' ? aDate - bDate : bDate - aDate;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return order === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  };

  const handleSort = (field: SortField) => {
    const newOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
    setFilteredAffiliates(sortData(filteredAffiliates, field, newOrder));
  };

  const fetchAffiliates = async (search?: string) => {
    try {
      console.log("Fetching affiliates from PostgreSQL API...");
      
      const params = search ? `?search=${encodeURIComponent(search)}` : '';
      const data = await apiClient.get(`/admin/affiliates${params}`);
      console.log("Affiliates fetched:", data);
      
      const sortedData = sortData(data || [], sortField, sortOrder);
      setAffiliates(data || []);
      setFilteredAffiliates(sortedData);
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

  const fetchPayouts = async (status?: string, search?: string) => {
    try {
      console.log("Fetching referral payouts from PostgreSQL API...");
      
      const params = new URLSearchParams();
      if (status && status !== 'all-status') params.append('status', status);
      if (search) params.append('search', search);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      
      const data = await apiClient.get(`/admin/referral-payouts${queryString}`);
      console.log("Referral payouts fetched:", data);
      
      setPayouts(data || []);
      setFilteredPayouts(data || []);
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

  const updatePayoutStatus = async (payoutId: string, status: string) => {
    try {
      console.log(`Updating payout ${payoutId} status to ${status}`);
      
      // Add PUT method to apiClient
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

  const filterAffiliates = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredAffiliates(affiliates);
      return;
    }

    const filtered = affiliates.filter(affiliate => 
      affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.referral_code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredAffiliates(filtered);
  };

  const filterPayouts = (statusFilter: string, searchTerm: string) => {
    let filtered = payouts;

    if (statusFilter && statusFilter !== 'all-status') {
      filtered = filtered.filter(payout => payout.status === statusFilter);
    }

    if (searchTerm && searchTerm.trim()) {
      filtered = filtered.filter(payout => 
        payout.affiliate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payout.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPayouts(filtered);
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
    affiliates,
    filteredAffiliates,
    payouts,
    filteredPayouts,
    stats,
    isLoading,
    error,
    filterAffiliates: fetchAffiliates,
    filterPayouts: fetchPayouts,
    updatePayoutStatus: async (id: string, status: string) => {
      try {
        console.log(`Updating payout ${id} status to ${status}`);
        
        // Add PUT method to apiClient
        const response = await fetch(`http://localhost:8000/admin/referral-payouts/${id}`, {
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
    },
    handleSort,
    sortField,
    sortOrder
  };
};
