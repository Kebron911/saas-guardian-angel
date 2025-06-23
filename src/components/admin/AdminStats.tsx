
import React, { useState, useEffect } from "react";
import { Users, CreditCard, BarChart3, MessageSquare, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const AdminStats = () => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_stats')
          .select('*');
          
        if (error) throw error;
        
        if (data) {
          setStats(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  const getIconComponent = (iconName: string) => {
    const iconComponents = {
      Users: <Users className="h-5 w-5 text-[#1A237E]" />,
      LinkIcon: <LinkIcon className="h-5 w-5 text-[#00B8D4]" />,
      CreditCard: <CreditCard className="h-5 w-5 text-[#FF6F61]" />,
      BarChart3: <BarChart3 className="h-5 w-5 text-[#4CAF50]" />,
      MessageSquare: <MessageSquare className="h-5 w-5 text-[#9C27B0]" />
    };
    
    return iconComponents[iconName] || <Users className="h-5 w-5" />;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="animate-pulse flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
              </div>
              <div className="bg-gray-200 p-3 rounded-full h-12 w-12"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.icon_bg}`}>
              {getIconComponent(stat.icon)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
