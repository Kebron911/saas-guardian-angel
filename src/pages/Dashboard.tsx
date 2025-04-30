
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { LiveStatus } from "@/components/dashboard/LiveStatus";
import { CallTrendChart } from "@/components/dashboard/CallTrendChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { GenerateSampleData } from "@/components/dashboard/GenerateSampleData";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("month"); // "month", "week", "custom"
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <DashboardLayout>
      {/* Date filter */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
        <div className="flex gap-4">
          <GenerateSampleData />
          <div className="bg-white rounded-lg border border-gray-200 py-1 px-2 flex space-x-2">
            <button 
              className={`px-3 py-1.5 rounded-md ${activeFilter === "month" ? "bg-[#1A237E] text-white" : "text-gray-600 hover:bg-gray-100"} text-sm font-medium`}
              onClick={() => setActiveFilter("month")}
            >
              This Month
            </button>
            <button 
              className={`px-3 py-1.5 rounded-md ${activeFilter === "week" ? "bg-[#1A237E] text-white" : "text-gray-600 hover:bg-gray-100"} text-sm font-medium`}
              onClick={() => setActiveFilter("week")}
            >
              This Week
            </button>
            <button 
              className={`px-3 py-1.5 rounded-md ${activeFilter === "custom" ? "bg-[#1A237E] text-white" : "text-gray-600 hover:bg-gray-100"} text-sm font-medium`}
              onClick={() => setActiveFilter("custom")}
            >
              Custom Range
            </button>
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
