import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAdminDashboardData } from "@/hooks/useAdminDashboardData";

function getLast12MonthsLabels() {
  const now = new Date();
  const months = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleString("default", { month: "short", year: "numeric" }));
  }
  return months;
}

export const FinanceRevenueTimelineChart = () => {
  const { revenueData, isLoading, error } = useAdminDashboardData();

  // Fill missing months with 0 revenue
  const months = getLast12MonthsLabels();
  const revenueMap = (revenueData || []).reduce((acc, cur) => {
    acc[cur.name] = cur.revenue;
    return acc;
  }, {} as Record<string, number>);
  const chartData = months.map((name) => ({
    name,
    revenue: revenueMap[name] ?? 0,
  }));

  if (isLoading) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 h-full w-full rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-red-500">Error loading revenue data: {error}</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#888888" fontSize={12} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value) => [`$${value}`, "Revenue"]}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #f0f0f0",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#1A237E"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, fill: "#1A237E" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
