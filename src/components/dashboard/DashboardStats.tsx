
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Headphones, Clock, CalendarDays, RefreshCcw, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Calls This Month</p>
              <p className="text-3xl font-bold mt-2">128</p>
              <p className="text-sm text-green-600 font-medium mt-1">+12% from last month</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Headphones className="w-6 h-6 text-[#1A237E]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Call Duration</p>
              <p className="text-3xl font-bold mt-2">2m 43s</p>
              <p className="text-sm text-gray-500 font-medium mt-1">Across all calls this month</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Clock className="w-6 h-6 text-[#1A237E]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Bookings Made</p>
              <p className="text-3xl font-bold mt-2">38</p>
              <p className="text-sm text-gray-500 font-medium mt-1">Booked by your AI assistant</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <CalendarDays className="w-6 h-6 text-[#1A237E]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Missed Calls Recovered</p>
              <p className="text-3xl font-bold mt-2">15</p>
              <p className="text-sm text-gray-500 font-medium mt-1">Handled via voicemail-to-booking</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <RefreshCcw className="w-6 h-6 text-[#1A237E]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Assistant Uptime</p>
              <p className="text-3xl font-bold mt-2">99.9%</p>
              <p className="text-sm text-gray-500 font-medium mt-1">Your assistant is always on</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Check className="w-6 h-6 text-[#1A237E]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
