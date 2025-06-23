
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminRevenueChart } from "@/components/admin/AdminRevenueChart";
import { AdminSubscriptionsChart } from "@/components/admin/AdminSubscriptionsChart";
import { AdminActivityFeed } from "@/components/admin/AdminActivityFeed";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useAdminDashboardData } from "@/hooks/useAdminDashboardData";
import { Users, Star, CreditCard, DollarSign, Award, MessageSquare } from "lucide-react";

const AdminDashboard = () => {
  const { user, role, checkUserRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isLoading: dataLoading, stats, revenueData, subscriptionsData, activityData } = useAdminDashboardData();
  
  // Check if the user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate("/login", { replace: true });
        return;
      }
      
      try {
        // First use the local role
        if (role === 'admin') {
          setIsAdmin(true);
          setLoading(false);
          return;
        }
        
        // Double-check with the server
        const detectedRole = await checkUserRole();
        
        if (detectedRole === 'admin') {
          setIsAdmin(true);
        } else {
          // Not an admin, redirect to dashboard
          toast({
            title: "Access denied",
            description: "You don't have permission to access the admin dashboard",
            variant: "destructive"
          });
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/dashboard", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminStatus();
  }, [user, navigate, role, checkUserRole, toast]);
  
  // Don't render anything until we've confirmed admin status
  if (loading || !isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Admin Overview</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataLoading ? "..." : stats.total_users}</div>
            <p className="text-xs text-muted-foreground">
              Active users in the system
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Affiliates</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataLoading ? "..." : stats.total_affiliates}</div>
            <p className="text-xs text-muted-foreground">
              Registered affiliate partners
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataLoading ? "..." : stats.active_subscriptions}</div>
            <p className="text-xs text-muted-foreground">
              Currently active subscriptions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dataLoading ? "..." : stats.monthly_revenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Revenue this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commissions Paid</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dataLoading ? "..." : stats.commissions_paid.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total commissions paid
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataLoading ? "..." : stats.open_tickets}</div>
            <p className="text-xs text-muted-foreground">
              Support tickets requiring attention
            </p>
          </CardContent>
        </Card>
      </div>

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
