
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

// Importing the refactored components
import { ReportsHeader } from "@/components/reports/ReportsHeader";
import { CallBreakdownChart } from "@/components/reports/CallBreakdownChart";
import { AssistantPerformance } from "@/components/reports/AssistantPerformance";
import { CallVolumeHeatmap } from "@/components/reports/CallVolumeHeatmap";
import { CallTrendGraph } from "@/components/reports/CallTrendGraph";
import { TopCallersList } from "@/components/reports/TopCallersList";
import { DownloadReports } from "@/components/reports/DownloadReports";

const Reports = () => {
  const [activeFilter, setActiveFilter] = useState("month");

  return (
    <DashboardLayout>
      <ReportsHeader activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      
      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <CallBreakdownChart />
        <AssistantPerformance />
        <CallVolumeHeatmap />
      </div>
      
      <CallTrendGraph />
      
      <TopCallersList />
      
      <DownloadReports />
      
      <p className="text-xs text-gray-500 mt-6 text-right">Updated 5 minutes ago</p>
    </DashboardLayout>
  );
};

export default Reports;
