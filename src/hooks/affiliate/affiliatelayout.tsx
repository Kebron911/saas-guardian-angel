import { useContext, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { affiliateApiService, AffiliateUser } from "@/services/affiliateApi";

export function useAffiliateUser() {
  const context = useAuth();
  const { toast } = useToast();
  const [affiliateUser, setAffiliateUser] = useState<AffiliateUser>({
    name: "Affiliate User",
    role: "Affiliate Partner",
    avatar: "/lovable-uploads/img/logo/updatedlogo1.png",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAffiliateProfile = async () => {
      if (!context?.user?.id) {
        return;
      }

      setLoading(true);
      try {
        const profile = await affiliateApiService.getAffiliateProfile(context.user.id);
        setAffiliateUser(profile);
      } catch (error) {
        console.error("Failed to fetch affiliate profile:", error);
        // Fallback to context data if API fails
        if (context?.user) {
          const { user, role } = context;
          const name =
            user?.email?.split("@")[0]?.replace(/[^a-zA-Z0-9]/g, " ")?.replace(/\b\w/g, c => c.toUpperCase()) ||
            "Affiliate User";
          const displayRole =
            role === "affiliate"
              ? "Affiliate Partner"
              : role.charAt(0).toUpperCase() + role.slice(1);

          setAffiliateUser({
            name,
            role: displayRole,
            avatar: "/lovable-uploads/img/logo/updatedlogo1.png",
            email: user.email,
          });
        }
        
        toast({
          title: "Warning",
          description: "Using cached profile data. Some features may be limited.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliateProfile();
  }, [context?.user?.id, toast]);

  const updateProfile = async (profileData: { name?: string; avatar?: string }) => {
    if (!context?.user?.id) {
      throw new Error("User not authenticated");
    }

    try {
      const updatedProfile = await affiliateApiService.updateAffiliateProfile(
        context.user.id,
        profileData
      );
      setAffiliateUser(updatedProfile);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      return updatedProfile;
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Fallback when no context available
  if (!context) {
    return {
      ...affiliateUser,
      loading,
      updateProfile,
    };
  }

  return {
    ...affiliateUser,
    loading,
    updateProfile,
  };
}
