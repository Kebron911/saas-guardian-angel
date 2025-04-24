
import React from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const LiveStatus = () => {
  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200 mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
          <span className="text-sm font-medium">1 Call in Progress</span>
        </div>
        <div className="flex items-center">
          <span className="flex h-2 w-2 rounded-full bg-red-500 mr-2"></span>
          <span className="text-sm font-medium">2 Voicemails Waiting</span>
        </div>
        <div className="flex items-center">
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
          <span className="text-sm font-medium">All systems operational</span>
        </div>
      </div>
      <div>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <Check className="w-3 h-3 mr-1" /> AI Assistant Active
        </Badge>
      </div>
    </div>
  );
};
