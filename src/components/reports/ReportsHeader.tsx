
import React from "react";

interface ReportsHeaderProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const ReportsHeader = ({ activeFilter, setActiveFilter }: ReportsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Reports & Analytics</h2>
        <p className="text-gray-600 dark:text-gray-400">Detailed insights about your AI receptionist performance</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 py-1 px-2 flex space-x-2">
        <button 
          className={`px-3 py-1.5 rounded-md ${
            activeFilter === "month" 
              ? "bg-[#1A237E] text-white dark:bg-[#00B8D4]" 
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          } text-sm font-medium`}
          onClick={() => setActiveFilter("month")}
        >
          This Month
        </button>
        <button 
          className={`px-3 py-1.5 rounded-md ${
            activeFilter === "quarter" 
              ? "bg-[#1A237E] text-white dark:bg-[#00B8D4]" 
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          } text-sm font-medium`}
          onClick={() => setActiveFilter("quarter")}
        >
          This Quarter
        </button>
        <button 
          className={`px-3 py-1.5 rounded-md ${
            activeFilter === "year" 
              ? "bg-[#1A237E] text-white dark:bg-[#00B8D4]" 
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          } text-sm font-medium`}
          onClick={() => setActiveFilter("year")}
        >
          This Year
        </button>
      </div>
    </div>
  );
};
