
import React from "react";
import { Users, CreditCard, BarChart3, MessageSquare, Link as LinkIcon } from "lucide-react";

export const AdminStats = () => {
  const stats = [
    {
      title: "Total Users",
      value: "3,721",
      change: "+12% from last month",
      icon: <Users className="h-5 w-5 text-[#1A237E]" />,
      iconBg: "bg-[#E8EAF6]",
    },
    {
      title: "Total Affiliates",
      value: "384",
      change: "+8% from last month",
      icon: <LinkIcon className="h-5 w-5 text-[#00B8D4]" />,
      iconBg: "bg-[#E0F7FA]",
    },
    {
      title: "Active Subscriptions",
      value: "2,843",
      change: "+5% from last month",
      icon: <CreditCard className="h-5 w-5 text-[#FF6F61]" />,
      iconBg: "bg-[#FFEBEE]",
    },
    {
      title: "Monthly Revenue",
      value: "$48,295",
      change: "+15% from last month",
      icon: <BarChart3 className="h-5 w-5 text-[#4CAF50]" />,
      iconBg: "bg-[#E8F5E9]",
    },
    {
      title: "Commissions Paid",
      value: "$12,347",
      change: "+7% from last month",
      icon: <CreditCard className="h-5 w-5 text-[#FFC107]" />,
      iconBg: "bg-[#FFF8E1]",
    },
    {
      title: "Open Tickets",
      value: "24",
      change: "-3% from last month",
      icon: <MessageSquare className="h-5 w-5 text-[#9C27B0]" />,
      iconBg: "bg-[#F3E5F5]",
    },
  ];

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
            <div className={`p-3 rounded-full ${stat.iconBg}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
