
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for pie chart - this would be replaced with real data
const pieData = [
  { name: "Bookings", value: 38 },
  { name: "General Inquiries", value: 32 },
  { name: "Voicemail", value: 18 },
  { name: "Missed Calls", value: 12 }
];

const COLORS = ["#1A237E", "#00B8D4", "#7986CB", "#FF6F61"];

export function CallBreakdownChart() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Call Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} calls`, 'Count']}
                itemStyle={{ color: '#1A237E' }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 flex-wrap mt-2">
          {pieData.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span className="text-xs">{entry.name}: {entry.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
