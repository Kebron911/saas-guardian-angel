
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data for call volume by day
const callVolumeData = [
  { day: "Mon", calls: 24 },
  { day: "Tue", calls: 18 },
  { day: "Wed", calls: 22 },
  { day: "Thu", calls: 17 },
  { day: "Fri", calls: 20 },
  { day: "Sat", calls: 14 },
  { day: "Sun", calls: 13 }
];

export function CallTrendGraph() {
  return (
    <Card className="shadow-sm mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Call Trend</CardTitle>
          <div className="bg-gray-100 rounded-md flex text-sm">
            <button className="px-3 py-1 rounded-md bg-[#1A237E] text-white">Calls</button>
            <button className="px-3 py-1 rounded-md text-gray-600">Bookings</button>
            <button className="px-3 py-1 rounded-md text-gray-600">Voicemails</button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={callVolumeData}>
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
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
