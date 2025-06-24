
import React from "react";
import { Users, CreditCard, BarChart3, MessageSquare, Link as LinkIcon } from "lucide-react";

export const AdminStats = () => {
  // Sample stats data that would normally come from an API
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12% from last month",
      icon: "Users",
      icon_bg: "bg-blue-100"
    },
    {
      title: "Active Affiliates",
      value: "487",
      change: "+8% from last month",
      icon: "LinkIcon",
      icon_bg: "bg-cyan-100"
    },
    {
      title: "Monthly Revenue",
      value: "$24,567",
      change: "+15% from last month",
      icon: "CreditCard",
      icon_bg: "bg-red-100"
    },
    {
      title: "Active Subscriptions",
      value: "1,234",
      change: "+5% from last month",
      icon: "BarChart3",
      icon_bg: "bg-green-100"
    },
    {
      title: "Support Tickets",
      value: "23",
      change: "-3% from last month",
      icon: "MessageSquare",
      icon_bg: "bg-purple-100"
    }
  ];
  
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
