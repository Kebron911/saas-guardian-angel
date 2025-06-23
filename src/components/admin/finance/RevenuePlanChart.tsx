
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenuePlanData } from "@/hooks/useFinanceDashboard";

interface RevenuePlanChartProps {
  data: RevenuePlanData[];
  isLoading: boolean;
}

const COLORS = ['#1A237E', '#00B8D4', '#FF6F61', '#4CAF50', '#9C27B0', '#FF9800'];

export const RevenuePlanChart: React.FC<RevenuePlanChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Plan</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="animate-pulse bg-gray-200 h-full w-full rounded"></div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Plan</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="revenue"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
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
                wrapperStyle={{ fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No plan revenue data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};
