
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { LiveStatus } from "@/components/dashboard/LiveStatus";
import { CallTrendChart } from "@/components/dashboard/CallTrendChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { GenerateSampleData } from "@/components/dashboard/GenerateSampleData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("month"); // "month", "week", "custom"
  
  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
  }, [user, navigate]);
  
  // Redirect to login if no user
  if (!user) {
    return null; // We redirect in useEffect
  }
  
  return (
    <DashboardLayout>
      {/* Date filter */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
        <div className="flex gap-4">
          <GenerateSampleData />
          <div className="bg-white rounded-lg border border-gray-200 py-1 px-2 flex space-x-2">
            <Button 
              variant="ghost"
              className={`px-3 py-1.5 rounded-md ${activeFilter === "month" ? "bg-[#1A237E] text-white" : "text-gray-600 hover:bg-gray-100"} text-sm font-medium`}
              onClick={() => setActiveFilter("month")}
            >
              This Month
            </Button>
            <Button 
              variant="ghost"
              className={`px-3 py-1.5 rounded-md ${activeFilter === "week" ? "bg-[#1A237E] text-white" : "text-gray-600 hover:bg-gray-100"} text-sm font-medium`}
              onClick={() => setActiveFilter("week")}
            >
              This Week
            </Button>
            <Button 
              variant="ghost"
              className={`px-3 py-1.5 rounded-md ${activeFilter === "custom" ? "bg-[#1A237E] text-white" : "text-gray-600 hover:bg-gray-100"} text-sm font-medium`}
              onClick={() => setActiveFilter("custom")}
            >
              Custom Range
            </Button>
          </div>
        </div>
      </div>

      <LiveStatus />
      <DashboardStats filter={activeFilter} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CallTrendChart filter={activeFilter} />
        <RecentActivity />
      </div>

      <QuickActions />
    </DashboardLayout>
  );
};

export default Dashboard;
