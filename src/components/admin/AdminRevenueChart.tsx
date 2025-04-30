
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAdminDashboardData } from "@/hooks/useAdminDashboardData";

export const AdminRevenueChart = () => {
  const { revenueData, isLoading, error } = useAdminDashboardData();

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
          data={revenueData}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
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
