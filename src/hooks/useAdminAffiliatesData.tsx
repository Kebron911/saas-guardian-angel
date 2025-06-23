import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Affiliate {
  id: string;
  user_id: string;
  name: string;
  email: string;
  referral_code: string;
  commission_rate: number;
  tier1_count: number;
  tier2_count: number;
  clicks: number;
  sign_ups: number;
  revenue: number;
  earnings: number;
  created_at: string;
  updated_at: string;
  free_trial_count: number;
  revenue_generated: number;
  commission_earned: number;
}

export const useAdminAffiliatesData = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [filteredAffiliates, setFilteredAffiliates] = useState<Affiliate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAffiliates = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from("affiliates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform the data to match our interface
      const transformedData: Affiliate[] = data.map((item: any) => ({
        id: item.id,
        user_id: item.user_id,
        name: item.Name || '',
        email: item.Email || '',
        referral_code: item.referral_code || '',
        commission_rate: item.commission_rate || 0,
        tier1_count: item.Tier_1 || 0,
        tier2_count: item.Tier_2 || 0,
        clicks: item.Clicks || 0,
        sign_ups: item["Sign Ups"] || 0,
        revenue: item.Revenue || 0,
        earnings: item.Earnings || 0,
        created_at: item.created_at,
        updated_at: item.updated_at,
        free_trial_count: 0, // Default value since not in original data
        revenue_generated: item.Revenue || 0,
        commission_earned: item.Earnings || 0
      }));

      setAffiliates(transformedData);
      setFilteredAffiliates(transformedData);
    } catch (err: any) {
      console.error("Error fetching affiliates:", err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load affiliates data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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

  const createAffiliate = async (affiliateData: Partial<Affiliate>) => {
    try {
      const { data, error } = await supabase
        .from("affiliates")
        .insert({
          Name: affiliateData.name,
          Email: affiliateData.email,
          referral_code: affiliateData.referral_code,
          commission_rate: affiliateData.commission_rate,
          user_id: affiliateData.user_id
        })
        .select()
        .single();

      if (error) throw error;

      await fetchAffiliates();
      toast({
        title: "Success",
        description: "Affiliate created successfully"
      });

      return data;
    } catch (err: any) {
      console.error("Error creating affiliate:", err);
      toast({
        title: "Error",
        description: "Failed to create affiliate",
        variant: "destructive"
      });
      throw err;
    }
  };

  const updateAffiliate = async (id: string, updates: Partial<Affiliate>) => {
    try {
      const { error } = await supabase
        .from("affiliates")
        .update({
          Name: updates.name,
          Email: updates.email,
          referral_code: updates.referral_code,
          commission_rate: updates.commission_rate
        })
        .eq("id", id);

      if (error) throw error;

      await fetchAffiliates();
      toast({
        title: "Success",
        description: "Affiliate updated successfully"
      });
    } catch (err: any) {
      console.error("Error updating affiliate:", err);
      toast({
        title: "Error",
        description: "Failed to update affiliate",
        variant: "destructive"
      });
      throw err;
    }
  };

  const deleteAffiliate = async (id: string) => {
    try {
      const { error } = await supabase
        .from("affiliates")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await fetchAffiliates();
      toast({
        title: "Success",
        description: "Affiliate deleted successfully"
      });
    } catch (err: any) {
      console.error("Error deleting affiliate:", err);
      toast({
        title: "Error",
        description: "Failed to delete affiliate",
        variant: "destructive"
      });
      throw err;
    }
  };

  // Initialize sample data if empty
  const initializeSampleData = async () => {
    try {
      const { data: existingData } = await supabase
        .from("affiliates")
        .select("id")
        .limit(1);

      if (!existingData || existingData.length === 0) {
        const sampleData = [
          {
            Name: "John Smith",
            Email: "john@example.com",
            referral_code: "JOHN2024",
            commission_rate: 0.15,
            Tier_1: 5,
            Tier_2: 2,
            "Sign Ups": 12,
            Clicks: 45,
            Revenue: 2500,
            Earnings: 375,
            user_id: "sample-user-1"
          },
          {
            Name: "Sarah Johnson",
            Email: "sarah@example.com",
            referral_code: "SARAH2024",
            commission_rate: 0.15,
            Tier_1: 8,
            Tier_2: 3,
            "Sign Ups": 18,
            Clicks: 67,
            Revenue: 3200,
            Earnings: 480,
            user_id: "sample-user-2"
          }
        ];

        await supabase.from("affiliates").insert(sampleData);
        await fetchAffiliates();
      }
    } catch (err) {
      console.error("Error initializing sample data:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchAffiliates();
      await initializeSampleData();
    };
    
    loadData();
  }, []);

  return {
    affiliates,
    filteredAffiliates,
    isLoading,
    error,
    fetchAffiliates,
    filterAffiliates,
    createAffiliate,
    updateAffiliate,
    deleteAffiliate
  };
};
