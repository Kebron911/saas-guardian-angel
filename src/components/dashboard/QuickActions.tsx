
import React from "react";
import { Edit, Headphones, CalendarDays, FileText } from "lucide-react";

export const QuickActions = () => {
  return (
    <>
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="flex items-center text-sm font-medium text-gray-600 hover:text-[#1A237E] bg-white border border-gray-200 rounded-md px-4 py-2">
          <Edit className="w-4 h-4 mr-2" />
          Edit Greeting
        </button>
        <button className="flex items-center text-sm font-medium text-gray-600 hover:text-[#1A237E] bg-white border border-gray-200 rounded-md px-4 py-2">
          <Headphones className="w-4 h-4 mr-2" />
          View Today's Calls
        </button>
        <button className="flex items-center text-sm font-medium text-gray-600 hover:text-[#1A237E] bg-white border border-gray-200 rounded-md px-4 py-2">
          <CalendarDays className="w-4 h-4 mr-2" />
          View Booking Calendar
        </button>
        <button className="flex items-center text-sm font-medium text-gray-600 hover:text-[#1A237E] bg-white border border-gray-200 rounded-md px-4 py-2">
          <FileText className="w-4 h-4 mr-2" />
          Download Report
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-6 text-right">Updated 5 minutes ago</p>
    </>
  );
};
