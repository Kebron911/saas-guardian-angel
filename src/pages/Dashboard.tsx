
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { LiveStatus } from "@/components/dashboard/LiveStatus";
import { CallTrendChart } from "@/components/dashboard/CallTrendChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  return (
    <DashboardLayout>
      {/* Date filter */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
        <div className="bg-white rounded-lg border border-gray-200 py-1 px-2 flex space-x-2">
          <button className="px-3 py-1.5 rounded-md bg-[#1A237E] text-white text-sm font-medium">
            This Month
          </button>
          <button className="px-3 py-1.5 rounded-md text-gray-600 text-sm font-medium hover:bg-gray-100">
            This Week
          </button>
          <button className="px-3 py-1.5 rounded-md text-gray-600 text-sm font-medium hover:bg-gray-100">
            Custom Range
          </button>
        </div>
      </div>

      <LiveStatus />
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CallTrendChart />
        <RecentActivity />
      </div>

      <QuickActions />
    </DashboardLayout>
  );
};

export default Dashboard;
