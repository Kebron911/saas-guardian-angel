
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart3,
  Users,
  Activity,
  Search,
  Filter,
  ChevronDown,
  Edit,
  Ban,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data
const userStats = {
  totalUsers: 2843,
  totalAffiliates: 428,
  totalAdmins: 16,
  newUsers30Days: 186,
  activeUsers: 2102,
  inactiveUsers: 741
};

const userListData = [
  { id: "U2813", name: "John Smith", email: "john@example.com", role: "Admin", status: "Active", createdAt: "2025-01-15" },
  { id: "U2814", name: "Sarah Johnson", email: "sarah@example.com", role: "User", status: "Active", createdAt: "2025-01-22" },
  { id: "U2815", name: "Michael Brown", email: "michael@example.com", role: "Affiliate", status: "Active", createdAt: "2025-02-03" },
  { id: "U2816", name: "Jennifer Lee", email: "jennifer@example.com", role: "User", status: "Inactive", createdAt: "2025-02-10" },
  { id: "U2817", name: "David Wilson", email: "david@example.com", role: "User", status: "Active", createdAt: "2025-02-18" },
  { id: "U2818", name: "Lisa Garcia", email: "lisa@example.com", role: "Affiliate", status: "Active", createdAt: "2025-03-05" },
  { id: "U2819", name: "Robert Taylor", email: "robert@example.com", role: "User", status: "Suspended", createdAt: "2025-03-12" },
  { id: "U2820", name: "Emily Martinez", email: "emily@example.com", role: "User", status: "Active", createdAt: "2025-03-25" }
];

const userActivityData = [
  { timestamp: "2025-04-23 14:32:15", eventType: "Login", performedBy: "John Smith", details: "Successful login from 192.168.1.1" },
  { timestamp: "2025-04-23 13:15:05", eventType: "Password Change", performedBy: "Sarah Johnson", details: "Password updated successfully" },
  { timestamp: "2025-04-23 11:47:32", eventType: "Profile Update", performedBy: "Michael Brown", details: "Updated profile information" },
  { timestamp: "2025-04-22 16:28:11", eventType: "Payment", performedBy: "Jennifer Lee", details: "Subscription renewed - $29.99" },
  { timestamp: "2025-04-22 10:12:45", eventType: "Login", performedBy: "David Wilson", details: "Failed login attempt" },
  { timestamp: "2025-04-21 09:05:22", eventType: "Referral", performedBy: "Lisa Garcia", details: "New referral: user@example.com" },
  { timestamp: "2025-04-21 08:44:18", eventType: "Login", performedBy: "Robert Taylor", details: "Successful login from 192.168.1.45" }
];

const UsersTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Total Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <Users className="w-8 h-8 mr-3 text-blue-600" />
          <div className="text-3xl font-bold">{userStats.totalUsers}</div>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          <span className="mr-3">Affiliates: {userStats.totalAffiliates}</span>
          <span>Admins: {userStats.totalAdmins}</span>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">New Users (30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{userStats.newUsers30Days}</div>
        <div className="mt-2 text-sm text-green-600">+12% from last month</div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Active vs Inactive</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Active</div>
            <div className="text-xl font-bold">{userStats.activeUsers}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Inactive</div>
            <div className="text-xl font-bold">{userStats.inactiveUsers}</div>
          </div>
        </div>
        <div className="w-full h-2 mt-3 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-blue-600 rounded-full" 
            style={{ width: `${(userStats.activeUsers / (userStats.activeUsers + userStats.inactiveUsers)) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>

    <Card className="col-span-1 md:col-span-3">
      <CardHeader>
        <CardTitle>Signups Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <div className="text-center text-gray-500">
          <BarChart3 className="mx-auto h-16 w-16 opacity-50" />
          <p className="mt-2">Signup trends chart will appear here</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const UserListTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search users..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="all-roles">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-roles">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="affiliate">Affiliate</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all-status">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold">User ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Created At</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userListData.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{user.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{user.name}</td>
                  <td className="px-4 py-3 text-sm">{user.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'Affiliate' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' :
                      user.status === 'Suspended' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{user.createdAt}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Ban className="h-4 w-4" />
                        <span className="sr-only">Suspend</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const UserActivityTab = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
        <Select defaultValue="all-roles">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-roles">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="affiliate">Affiliate</SelectItem>
          </SelectContent>
        </Select>
        
        <Select defaultValue="all-events">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Events" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-events">All Events</SelectItem>
            <SelectItem value="login">Login</SelectItem>
            <SelectItem value="profile">Profile Update</SelectItem>
            <SelectItem value="payment">Payment</SelectItem>
            <SelectItem value="referral">Referral</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex-1"></div>
        
        <Button variant="outline" className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          <span>Date Range</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold">Timestamp</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Event Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Performed By</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {userActivityData.map((activity, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{activity.timestamp}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      activity.eventType === 'Login' ? 'bg-blue-100 text-blue-800' :
                      activity.eventType === 'Password Change' ? 'bg-yellow-100 text-yellow-800' :
                      activity.eventType === 'Referral' ? 'bg-green-100 text-green-800' :
                      activity.eventType === 'Payment' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.eventType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{activity.performedBy}</td>
                  <td className="px-4 py-3 text-sm">{activity.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const AdminUsersPage = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Users Management</h2>
        <p className="text-gray-500">Manage users, view activity, and monitor user growth</p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="list">User List</TabsTrigger>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <UsersTab />
        </TabsContent>
        <TabsContent value="list">
          <UserListTab />
        </TabsContent>
        <TabsContent value="activity">
          <UserActivityTab />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminUsersPage;
