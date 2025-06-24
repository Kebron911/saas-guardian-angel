
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { CallTrendChart } from "@/components/dashboard/CallTrendChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { LiveStatus } from "@/components/dashboard/LiveStatus";
import { useDashboardData } from "@/hooks/useDashboardData";

const Dashboard = () => {
  const { callTrends, stats, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <LiveStatus />
        </div>

        <DashboardStats {...stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CallTrendChart trends={callTrends} />
          <QuickActions />
        </div>
        
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
