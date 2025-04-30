
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export function AssistantPerformance() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Assistant Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Average Response Time</p>
                <p className="text-xl font-semibold">1.8s</p>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">12% faster</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Calls Handled Without Fallback</p>
                <p className="text-xl font-semibold">94.2%</p>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">+3.5%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Bookings Handled Automatically</p>
                <p className="text-xl font-semibold">86.5%</p>
              </div>
              <div className="flex items-center text-red-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">-1.2%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Customer Satisfaction Score</p>
                <p className="text-xl font-semibold">4.8/5</p>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">+0.2</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
