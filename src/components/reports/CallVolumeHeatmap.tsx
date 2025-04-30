
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample heatmap data (simplified representation)
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hoursOfDay = Array.from({ length: 12 }, (_, i) => i + 8); // 8am - 7pm

const generateHeatmapData = () => {
  const data = [];
  
  daysOfWeek.forEach(day => {
    hoursOfDay.forEach(hour => {
      data.push({
        day,
        hour: `${hour}:00`,
        value: Math.floor(Math.random() * 10)
      });
    });
  });
  
  return data;
};

const heatmapData = generateHeatmapData();

export function CallVolumeHeatmap() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Call Volume Heatmap</CardTitle>
          <div className="flex gap-2">
            <div className="flex items-center">
              <span className="block w-3 h-3 rounded-full bg-green-200 mr-1"></span>
              <span className="text-xs text-gray-500">Low</span>
            </div>
            <div className="flex items-center">
              <span className="block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
              <span className="text-xs text-gray-500">Medium</span>
            </div>
            <div className="flex items-center">
              <span className="block w-3 h-3 rounded-full bg-green-700 mr-1"></span>
              <span className="text-xs text-gray-500">High</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-center mb-2">Hour of Day (8AM - 7PM)</div>
        <div className="grid grid-cols-12 gap-1">
          {/* Hours header */}
          {hoursOfDay.map((hour) => (
            <div key={hour} className="h-6 flex items-center justify-center text-xs text-gray-500">
              {hour}
            </div>
          ))}
          
          {/* Day rows */}
          {daysOfWeek.map((day) => (
            <React.Fragment key={day}>
              <div className="col-span-12 text-left text-xs text-gray-500 mt-1">{day}</div>
              {hoursOfDay.map((hour) => {
                const cellData = heatmapData.find(d => d.day === day && d.hour === `${hour}:00`);
                const value = cellData ? cellData.value : 0;
                let bgColor = 'bg-green-100';
                if (value > 6) bgColor = 'bg-green-700';
                else if (value > 3) bgColor = 'bg-green-500';
                else if (value > 0) bgColor = 'bg-green-200';
                
                return (
                  <div 
                    key={`${day}-${hour}`} 
                    className={`h-6 ${bgColor} rounded-sm flex items-center justify-center`} 
                    title={`${day}, ${hour}:00 - ${value} calls`}
                  >
                    <span className="text-xs text-white font-medium">{value > 0 ? value : ''}</span>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">
          Tuesday, 2PM is your busiest time with an average of 9 calls
        </div>
      </CardContent>
    </Card>
  );
}
