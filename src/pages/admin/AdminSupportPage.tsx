
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import {
  Search,
  Filter,
  ChevronDown,
  Calendar
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
import { useSupportTickets } from '@/hooks/useSupportTickets';

interface FilterState {
  search: string;
  status: string;
  priority: string;
  user: string;
  assignedAdmin: string;
  dateRange: string;
}

const AdminSupportPage = () => {
  const { tickets, isLoading, error } = useSupportTickets();
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    priority: 'all',
    user: 'all',
    assignedAdmin: 'all',
    dateRange: 'all'
  });

  // Get unique users for filter dropdown
  const uniqueUsers = Array.from(new Set(
    tickets.map(ticket => ticket.user_email)
  )).filter(email => email) as string[];

  // Get unique admins for filter dropdown
  const uniqueAdmins = Array.from(new Set(
    tickets
      .map(ticket => ticket.assigned_admin)
      .filter(admin => admin !== null)
  )) as string[];

  // Filter tickets based on current filters
  useEffect(() => {
    let filtered = [...tickets];

    // Search filter - searches across multiple fields
    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim();
      filtered = filtered.filter(ticket => 
        ticket.ticket_id.toLowerCase().includes(searchTerm) ||
        ticket.user_email.toLowerCase().includes(searchTerm) ||
        ticket.subject.toLowerCase().includes(searchTerm) ||
        (ticket.message && ticket.message.toLowerCase().includes(searchTerm))
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(ticket => 
        ticket.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter(ticket => 
        ticket.priority.toLowerCase() === filters.priority.toLowerCase()
      );
    }

    // User filter
    if (filters.user !== 'all') {
      filtered = filtered.filter(ticket => 
        ticket.user_email === filters.user
      );
    }

    // Assigned admin filter
    if (filters.assignedAdmin !== 'all') {
      if (filters.assignedAdmin === 'unassigned') {
        filtered = filtered.filter(ticket => !ticket.assigned_admin);
      } else {
        filtered = filtered.filter(ticket => 
          ticket.assigned_admin === filters.assignedAdmin
        );
      }
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          cutoffDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          cutoffDate.setMonth(now.getMonth() - 3);
          break;
      }
      
      if (filters.dateRange !== 'all') {
        filtered = filtered.filter(ticket => 
          new Date(ticket.last_updated) >= cutoffDate
        );
      }
    }

    setFilteredTickets(filtered);
  }, [tickets, filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      priority: 'all',
      user: 'all',
      assignedAdmin: 'all',
      dateRange: 'all'
    });
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Support Tickets</h2>
        <p className="text-gray-500">Manage and respond to customer support tickets</p>
      </div>

      <div className="flex flex-col space-y-4 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search tickets by ID, email, subject, or message..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
        
        {/* Filters Row */}
        <div className="flex flex-wrap gap-3">
          <Select 
            value={filters.status} 
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.priority} 
            onValueChange={(value) => handleFilterChange('priority', value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.user} 
            onValueChange={(value) => handleFilterChange('user', value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {uniqueUsers.map(user => (
                <SelectItem key={user} value={user}>{user}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.assignedAdmin} 
            onValueChange={(value) => handleFilterChange('assignedAdmin', value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Admins" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Admins</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {uniqueAdmins.map(admin => (
                <SelectItem key={admin} value={admin}>{admin}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.dateRange} 
            onValueChange={(value) => handleFilterChange('dateRange', value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={clearFilters} className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </div>
        
        {/* Results Summary */}
        <div className="text-sm text-gray-600">
          Showing {filteredTickets.length} of {tickets.length} tickets
        </div>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold">Ticket ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">User</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Last Updated</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Assigned Admin</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Priority</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">Loading tickets...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-red-500">{error}</td>
                </tr>
              ) : filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    {filters.search || filters.status !== 'all' || filters.priority !== 'all' || filters.user !== 'all' || filters.assignedAdmin !== 'all' || filters.dateRange !== 'all' 
                      ? 'No tickets match your current filters' 
                      : 'No tickets found'}
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.ticket_id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono">{ticket.ticket_id.slice(0, 8)}</td>
                    <td className="px-4 py-3 text-sm">{ticket.user_email}</td>
                    <td className="px-4 py-3 text-sm">{ticket.subject}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                        ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        ticket.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{new Date(ticket.last_updated).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{ticket.assigned_admin || 'Unassigned'}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                        ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {ticket.priority}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
};

export default AdminSupportPage;
