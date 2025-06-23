
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useReportData } from "@/hooks/useReportData";
import { Skeleton } from "@/components/ui/skeleton";

export const CallBreakdownChart = () => {
  const { reportData, isLoading, error } = useReportData();

  const COLORS = ['#1A237E', '#00B8D4', '#FF6F61', '#8BC34A'];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Call Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[250px] flex items-center justify-center">
            <Skeleton className="w-full h-full rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !reportData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Call Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-500">
            Error loading data
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate percentages
  const total = reportData.callBreakdown.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentage = reportData.callBreakdown.map(item => ({
    ...item,
    percentage: Math.round((item.value / total) * 100)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithPercentage}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dataWithPercentage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} calls`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          {dataWithPercentage.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
              <span className="text-sm">{item.name}: {item.value} calls</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
