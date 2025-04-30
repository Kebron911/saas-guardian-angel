
import React, { useState } from "react";
import { Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ReportsHeaderProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export function ReportsHeader({ activeFilter, setActiveFilter }: ReportsHeaderProps) {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Reports & Statistics</h2>
        <p className="text-gray-500 mt-1">Monitor your AI receptionist performance and call trends.</p>
      </div>
      
      {/* Date filter and search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 py-1 px-2 flex space-x-2">
          <button 
            className={`px-3 py-1.5 rounded-md ${activeFilter === "month" ? "bg-[#1A237E] text-white" : "text-gray-600 hover:bg-gray-100"} text-sm font-medium`}
            onClick={() => setActiveFilter("month")}
          >
            This Month
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${activeFilter === "week" ? "bg-[#1A237E] text-white" : "text-gray-600 hover:bg-gray-100"} text-sm font-medium`}
            onClick={() => setActiveFilter("week")}
          >
            This Week
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${activeFilter === "custom" ? "bg-[#1A237E] text-white" : "text-gray-600 hover:bg-gray-100"} text-sm font-medium`}
            onClick={() => setActiveFilter("custom")}
          >
            <Calendar className="h-4 w-4 inline mr-1" />
            Custom
          </button>
        </div>
        
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search by name, number, or tag" 
            className="pl-9 w-full md:w-[280px]"
          />
        </div>
      </div>
    </>
  );
}
