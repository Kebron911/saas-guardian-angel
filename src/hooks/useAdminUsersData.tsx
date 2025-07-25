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

  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from: string | null; to: string | null }>({ from: null, to: null });

  const fetchUsers = async (
    role: string = roleFilter,
    status: string = statusFilter,
    from?: string | null,
    to?: string | null
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      let params: string[] = [];
      if (role && role !== "all") params.push(`role=${encodeURIComponent(role)}`);
      if (status && status !== "all") params.push(`status=${encodeURIComponent(status)}`);
      if (from) params.push(`from=${encodeURIComponent(from)}`);
      if (to) params.push(`to=${encodeURIComponent(to)}`);
      const query = params.length ? `?${params.join("&")}` : "";

      console.log("Fetching users from PostgreSQL API...", query);
      
      // Fetch users from PostgreSQL API
      const data = await apiClient.get(`/admin/users${query}`);
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

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        fetchUsers(roleFilter, statusFilter, dateRange.from, dateRange.to),
        fetchStats()
      ]);
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
    users,
    stats,
    isLoading,
    error,
    fetchUsers: fetchAllData,
    createUser,
    updateUser,
    deleteUser,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    dateRange,
    setDateRange,
  };
};
