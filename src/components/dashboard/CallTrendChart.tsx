
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useDashboardData } from "@/hooks/useDashboardData";

export const CallTrendChart = () => {
  const { callTrends, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <Card className="lg:col-span-2 shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Call Trend</h3>
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse bg-gray-200 h-full w-full rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Find the day with maximum bookings
  let peakDay = "";
  let maxBookings = 0;
  
  callTrends.forEach(day => {
    if (day.bookings > maxBookings) {
      maxBookings = day.bookings;
      peakDay = day.day;
    }
  });

  return (
    <Card className="lg:col-span-2 shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Call Trend</h3>
          <div className="text-sm text-teal-600">
            ↑ Bookings peak on {peakDay}s
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={callTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="calls" 
                stroke="#1A237E" 
                strokeWidth={2} 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="bookings" 
                stroke="#00B8D4" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
