
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useAdminDashboardData } from "@/hooks/useAdminDashboardData";

export const AdminSubscriptionsChart = () => {
  const { subscriptionsData, isLoading, error } = useAdminDashboardData();

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
        <p className="text-red-500">Error loading subscription data: {error}</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={subscriptionsData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {subscriptionsData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [value, "Subscribers"]}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #f0f0f0",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
