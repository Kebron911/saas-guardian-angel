
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

export const CallVolumeHeatmap = () => {
  // Generate mock data for the heatmap
  const generateHeatmapData = () => {
    const data = [];
    for (let day of days) {
      for (let hour of hours) {
        // More calls during business hours on weekdays
        let baseVolume = 0;
        
        // Weekdays have higher volume
        if (["Mon", "Tue", "Wed", "Thu", "Fri"].includes(day)) {
          baseVolume = 5;
        } else {
          baseVolume = 2;
        }
        
        // Mid-day hours have higher volume
        if (hour >= 11 && hour <= 15) {
          baseVolume += 3;
        }
        
        // Add some randomness
        const volume = baseVolume + Math.floor(Math.random() * 5);
        
        data.push({
          day,
          hour: `${hour}:00`,
          volume
        });
      }
    }
    return data;
  };
  
  const heatmapData = generateHeatmapData();
  
  // Function to determine the color intensity based on call volume
  const getColorIntensity = (volume: number) => {
    const maxVolume = 13; // Based on our generated data
    const intensity = Math.min(0.9, Math.max(0.1, volume / maxVolume));
    
    // For dark mode compatibility, use HSL with lightness that works in both themes
    return {
      backgroundColor: `hsla(231, 48%, 30%, ${intensity})`,
      color: intensity > 0.5 ? "white" : "inherit"
    };
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Call Volume Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] overflow-auto">
          <div className="grid grid-cols-[auto_repeat(7,1fr)] gap-[2px]">
            {/* Hours column */}
            <div className="sticky left-0 bg-white dark:bg-gray-800 z-10">
              <div className="h-8"></div> {/* Empty cell for corner */}
              {hours.map(hour => (
                <div
                  key={hour}
                  className="h-8 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400"
                >
                  {hour}:00
                </div>
              ))}
            </div>
            
            {/* Days and data cells */}
            {days.map((day, dayIndex) => (
              <div key={day}>
                {/* Day header */}
                <div className="h-8 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400">
                  {day}
                </div>
                
                {/* Hour cells for this day */}
                {hours.map((hour, hourIndex) => {
                  const cellData = heatmapData.find(d => d.day === day && d.hour === `${hour}:00`);
                  const volume = cellData ? cellData.volume : 0;
                  const cellStyle = getColorIntensity(volume);
                  
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className="h-8 flex items-center justify-center text-xs rounded-sm"
                      style={cellStyle}
                    >
                      {volume}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
