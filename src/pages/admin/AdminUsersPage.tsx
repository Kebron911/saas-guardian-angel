
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users, MoreHorizontal, Shield, Star, TrendingUp, TrendingDown } from "lucide-react";
import { useAdminUsersData } from "@/hooks/useAdminUsersData";
import { AddUserDialog } from "@/components/admin/AddUserDialog";
import { TableFilters } from "@/components/admin/TableFilters";
import { useToast } from "@/hooks/use-toast";

const AdminUsersPage = () => {
  const {
    users,
    stats,
    isLoading,
    error,
    deleteUser,
    createUser,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    dateRange,
    setDateRange,
    clearFilters
  } = useAdminUsersData();
  const { toast } = useToast();

  const handleActionClick = async (action: string, userId: string) => {
    console.log(`${action} user ${userId}`);
    
    if (action === 'delete') {
      try {
        await deleteUser(userId);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    } else {
      toast({
        title: "Action Triggered",
        description: `${action} action for user ${userId}`,
      });
    }
  };

  const getTrendIcon = (change: string) => {
    if (change.startsWith('+')) {
      return <TrendingUp className="h-3 w-3 text-green-500" />;
    } else if (change.startsWith('-')) {
      return <TrendingDown className="h-3 w-3 text-red-500" />;
    }
    return null;
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading users...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">Error: {error}</div>
        </div>
      </AdminLayout>
    );
  }

  const sortOptions = [
    { value: 'created_at', label: 'Created Date' },
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'role', label: 'Role' },
    { value: 'status', label: 'Status' }
  ];

  const filters = [
    {
      key: 'role',
      label: 'Role',
      value: roleFilter,
      options: [
        { value: 'all', label: 'All Roles' },
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
        { value: 'affiliate', label: 'Affiliate' }
      ],
      onChange: setRoleFilter
    },
    {
      key: 'status',
      label: 'Status',
      value: statusFilter,
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ],
      onChange: setStatusFilter
    }
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
        <p className="text-gray-500">Manage system users and their permissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_users}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span>+{stats.new_users_this_month} this month</span>
              <div className="flex items-center ml-2">
                {getTrendIcon(stats.users_percentage_change)}
                <span className="ml-1">{stats.users_percentage_change}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_admins}</div>
            <p className="text-xs text-muted-foreground">
              Admin users
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Affiliates</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_affiliates}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span>+{stats.new_affiliates_this_month} this month</span>
              <div className="flex items-center ml-2">
                {getTrendIcon(stats.affiliates_percentage_change)}
                <span className="ml-1">{stats.affiliates_percentage_change}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Users</CardTitle>
          <AddUserDialog onCreateUser={createUser} />
        </CardHeader>
        <CardContent>
          <TableFilters
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            sortValue={sortBy}
            onSortChange={setSortBy}
            sortDirection={sortDirection}
            onSortDirectionChange={setSortDirection}
            sortOptions={sortOptions}
            filters={filters}
            dateRange={dateRange}
            onClearFilters={clearFilters}
            searchPlaceholder="Search users..."
          />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'default' : user.role === 'affiliate' ? 'secondary' : 'outline'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleActionClick('edit', user.id)}>
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleActionClick('permissions', user.id)}>
                            Manage Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleActionClick('delete', user.id)}>
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {users.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No users found matching your search criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminUsersPage;
