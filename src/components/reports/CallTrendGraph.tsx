
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export const CallTrendGraph = () => {
  // Generate mock data for past 30 days
  const generateTrendData = () => {
    const data = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      
      data.push({
        date: `${day} ${month}`,
        calls: Math.floor(Math.random() * 20) + 10,
        bookings: Math.floor(Math.random() * 10) + 2,
      });
    }
    return data;
  };
  
  const trendData = generateTrendData();
  
  return (
    <Card className="shadow-sm mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Call Volume Trend (Last 30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#888" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value, index) => index % 3 === 0 ? value : ''}
              />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #f0f0f0",
                  borderRadius: "4px",
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="calls" 
                name="Total Calls"
                stroke="#1A237E" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="bookings" 
                name="Bookings Made"
                stroke="#00B8D4" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
