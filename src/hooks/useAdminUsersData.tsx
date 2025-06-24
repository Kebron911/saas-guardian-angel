
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

export interface AdminUser {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
}

export interface UserStats {
  total_users: number;
  total_admins: number;
  total_affiliates: number;
  new_users_this_month: number;
  new_affiliates_this_month: number;
  users_percentage_change: string;
  affiliates_percentage_change: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  role: string;
}

export const useAdminUsersData = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<UserStats>({
    total_users: 0,
    total_admins: 0,
    total_affiliates: 0,
    new_users_this_month: 0,
    new_affiliates_this_month: 0,
    users_percentage_change: "0%",
    affiliates_percentage_change: "0%"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("Fetching users from PostgreSQL API...");
      
      const data = await apiClient.get('/admin/users');
      console.log("Users fetched:", data);
      
      setUsers(data || []);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load users data",
        variant: "destructive"
      });
    }
  };

  const fetchStats = async () => {
    try {
      console.log("Fetching user stats from PostgreSQL API...");
      
      const data = await apiClient.get('/admin/user-stats');
      console.log("User stats fetched:", data);
      
      setStats(data || stats);
    } catch (err: any) {
      console.error("Error fetching user stats:", err);
      toast({
        title: "Error",
        description: "Failed to load user statistics",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    let filtered = [...users];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Date range filter
    if (dateRange.from || dateRange.to) {
      filtered = filtered.filter(user => {
        const userDate = new Date(user.created_at);
        const fromDate = dateRange.from;
        const toDate = dateRange.to;
        
        if (fromDate && toDate) {
          return userDate >= fromDate && userDate <= toDate;
        } else if (fromDate) {
          return userDate >= fromDate;
        } else if (toDate) {
          return userDate <= toDate;
        }
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof AdminUser];
      let bValue: any = b[sortBy as keyof AdminUser];

      if (sortBy === 'created_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter, sortBy, sortDirection, dateRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setStatusFilter('all');
    setSortBy('created_at');
    setSortDirection('desc');
    setDateRange({ from: undefined, to: undefined });
  };

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([fetchUsers(), fetchStats()]);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (userData: CreateUserData) => {
    try {
      console.log("Creating user:", userData);
      const result = await apiClient.post('/admin/users', userData);
      
      await fetchAllData();
      toast({
        title: "Success",
        description: "User created successfully"
      });

      return result;
    } catch (err: any) {
      console.error("Error creating user:", err);
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive"
      });
      throw err;
    }
  };

  const updateUser = async (id: string, updates: Partial<AdminUser>) => {
    try {
      await apiClient.post(`/admin/users/${id}`, updates);

      await fetchAllData();
      toast({
        title: "Success",
        description: "User updated successfully"
      });
    } catch (err: any) {
      console.error("Error updating user:", err);
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive"
      });
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await apiClient.delete(`/admin/users/${id}`);

      await fetchAllData();
      toast({
        title: "Success",
        description: "User deleted successfully"
      });
    } catch (err: any) {
      console.error("Error deleting user:", err);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive"
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return {
    users: filteredUsers,
    stats,
    isLoading,
    error,
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
    clearFilters,
    fetchUsers: fetchAllData,
    createUser,
    updateUser,
    deleteUser
  };
};
