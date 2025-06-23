
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

export const AssistantPerformance = () => {
  // Mock data - in a real app would come from props or a data hook
  const data = [
    { metric: "Response", score: 98 },
    { metric: "Accuracy", score: 92 },
    { metric: "Helpfulness", score: 95 },
    { metric: "Resolution", score: 88 }
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Assistant Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={40}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="metric" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                formatter={(value) => [`${value}%`, "Score"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #f0f0f0",
                  borderRadius: "4px",
                }}
              />
              <Bar 
                dataKey="score" 
                fill="#1A237E" 
                radius={[4, 4, 0, 0]} 
                label={{ position: 'top', formatter: (value) => `${value}%` }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
