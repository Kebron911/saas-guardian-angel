
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const callData = [
  { day: 'Mon', calls: 28, bookings: 12 },
  { day: 'Tue', calls: 35, bookings: 15 },
  { day: 'Wed', calls: 42, bookings: 18 },
  { day: 'Thu', calls: 38, bookings: 16 },
  { day: 'Fri', calls: 32, bookings: 14 },
  { day: 'Sat', calls: 18, bookings: 8 },
  { day: 'Sun', calls: 15, bookings: 5 },
];

export const CallTrendChart = () => {
  return (
    <Card className="lg:col-span-2 shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Call Trend</h3>
          <div className="text-sm text-teal-600">
            ↑ Bookings peak on Mondays
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={callData}>
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
