
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Calendar, Clock } from "lucide-react";

export const TopCallersList = () => {
  // Mock data for top callers
  const topCallers = [
    { 
      name: "John Smith", 
      phone: "(555) 123-4567", 
      callCount: 8, 
      lastCall: "Apr 29, 2025", 
      averageDuration: "4:12"
    },
    { 
      name: "Mary Johnson", 
      phone: "(555) 234-5678", 
      callCount: 6, 
      lastCall: "Apr 27, 2025", 
      averageDuration: "3:45"
    },
    { 
      name: "Robert Williams", 
      phone: "(555) 345-6789", 
      callCount: 5, 
      lastCall: "Apr 25, 2025", 
      averageDuration: "5:32"
    },
    { 
      name: "Elizabeth Brown", 
      phone: "(555) 456-7890", 
      callCount: 4, 
      lastCall: "Apr 23, 2025", 
      averageDuration: "2:58"
    },
    { 
      name: "Michael Davis", 
      phone: "(555) 567-8901", 
      callCount: 3, 
      lastCall: "Apr 20, 2025", 
      averageDuration: "3:22"
    }
  ];

  return (
    <Card className="shadow-sm mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Top Callers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">Caller</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">Phone Number</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">Call Count</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">Last Call</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">Avg. Duration</th>
              </tr>
            </thead>
            <tbody>
              {topCallers.map((caller, index) => (
                <tr 
                  key={index} 
                  className={
                    index !== topCallers.length - 1 
                      ? "border-b dark:border-gray-700" 
                      : ""
                  }
                >
                  <td className="py-3 px-4">{caller.name}</td>
                  <td className="py-3 px-4 flex items-center">
                    <Phone size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                    {caller.phone}
                  </td>
                  <td className="py-3 px-4">{caller.callCount}</td>
                  <td className="py-3 px-4 flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                    {caller.lastCall}
                  </td>
                  <td className="py-3 px-4 flex items-center">
                    <Clock size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                    {caller.averageDuration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
