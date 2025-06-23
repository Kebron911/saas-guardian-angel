
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import JoinAffiliateBanner from "@/components/affiliate/JoinAffiliateBanner";
import AffiliateDashboard from "@/pages/AffiliateDashboard";

const DashboardAffiliatePage = () => {
  // In a real app, this would come from an API/database
  const [isAffiliate, setIsAffiliate] = useState(false);
  const { user } = useAuth();
  
  const handleApproval = () => {
    // In a real app, this would send a request to the server
    // For now, we'll just simulate approval
    setIsAffiliate(true);
  };

  return (
    <DashboardLayout>
      {isAffiliate ? (
        // Show the full affiliate dashboard when approved
        <AffiliateDashboard />
      ) : (
        // Show the join affiliate banner when not approved
        <JoinAffiliateBanner onApplySuccess={handleApproval} />
      )}
    </DashboardLayout>
  );
};

export default DashboardAffiliatePage;
