
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const AdminRevenueChart = () => {
  const data = [
    { name: "Jan", revenue: 12400 },
    { name: "Feb", revenue: 15600 },
    { name: "Mar", revenue: 18200 },
    { name: "Apr", revenue: 21000 },
    { name: "May", revenue: 25600 },
    { name: "Jun", revenue: 32100 },
    { name: "Jul", revenue: 36500 },
    { name: "Aug", revenue: 42800 },
    { name: "Sep", revenue: 48295 },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
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
