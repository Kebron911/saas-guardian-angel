
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminRevenueChart } from "@/components/admin/AdminRevenueChart";
import { AdminSubscriptionsChart } from "@/components/admin/AdminSubscriptionsChart";
import { AdminActivityFeed } from "@/components/admin/AdminActivityFeed";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Admin Overview</h2>
      </div>

      <AdminStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminRevenueChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Subscriptions by Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminSubscriptionsChart />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminActivityFeed />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminDashboard;
