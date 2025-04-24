
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, RefreshCcw, Headphones } from "lucide-react";

const activities = [
  { 
    action: "John booked an appointment", 
    time: "Apr 20, 2:15 PM", 
    icon: <Calendar className="w-4 h-4 text-[#1A237E]" /> 
  },
  { 
    action: "Missed call recovered", 
    time: "Apr 20, 10:04 AM", 
    icon: <RefreshCcw className="w-4 h-4 text-[#00B8D4]" /> 
  },
  { 
    action: "New voicemail received", 
    time: "Apr 19, 4:30 PM", 
    icon: <Headphones className="w-4 h-4 text-gray-600" /> 
  },
  { 
    action: "Susan booked an appointment", 
    time: "Apr 19, 11:47 AM", 
    icon: <Calendar className="w-4 h-4 text-[#1A237E]" /> 
  },
  { 
    action: "AI assistant updated", 
    time: "Apr 18, 9:15 AM", 
    icon: <RefreshCcw className="w-4 h-4 text-[#00B8D4]" /> 
  },
];

export const RecentActivity = () => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Recent Activity</h3>
          <button className="text-sm text-[#00B8D4]">View All</button>
        </div>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="rounded-full bg-gray-100 p-2 mt-0.5">
                {activity.icon}
              </div>
              <div>
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
