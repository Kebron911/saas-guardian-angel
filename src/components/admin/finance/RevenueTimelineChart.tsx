
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueTimelineData } from "@/hooks/useFinanceDashboard";

interface RevenueTimelineChartProps {
  data: RevenueTimelineData[];
  isLoading: boolean;
}

export const RevenueTimelineChart: React.FC<RevenueTimelineChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue Timeline</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="animate-pulse bg-gray-200 h-full w-full rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Timeline</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#888888" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
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
                dot={{ r: 4, fill: "#1A237E" }}
                activeDot={{ r: 6, fill: "#1A237E" }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No revenue data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};
