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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { API_BASE_URL } from "@/lib/api-client";

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
  const [editTicket, setEditTicket] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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

  const openEditDialog = (ticket: any) => {
    setEditTicket(ticket);
    setEditForm({ ...ticket });
    setSaveError(null);
  };
  const closeEditDialog = () => {
    setEditTicket(null);
    setEditForm(null);
    setSaveError(null);
  };
  const handleEditChange = (key: string, value: any) => {
    setEditForm((prev: any) => ({ ...prev, [key]: value }));
  };
  const saveEdit = async () => {
    if (!editForm) return;
    setSaving(true);
    setSaveError(null);
    try {
      // Only send user_email and assigned_admin (emails), not IDs
      const payload = {
        user_email: editForm.user_email,
        subject: editForm.subject,
        message: editForm.message,
        status: editForm.status,
        priority: editForm.priority,
        assigned_admin: editForm.assigned_admin || null,
        comments: editForm.comments || "",
        closed_at: editForm.closed_at || null
      };
      const res = await fetch(`${API_BASE_URL}/admin/support-tickets/${editForm.ticket_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to save ticket");
      closeEditDialog();
      // Optionally refresh tickets here
      window.location.reload();
    } catch (err: any) {
      setSaveError(err.message || "Failed to save ticket");
    } finally {
      setSaving(false);
    }
  };

  const openCreateDialog = () => {
    setCreateForm({
      subject: '',
      user_email: '',
      assigned_admin: '',
      priority: 'medium',
      status: 'open',
      message: ''
    });
    setCreateOpen(true);
  };
  const closeCreateDialog = () => {
    setCreateOpen(false);
    setCreateForm(null);
  };
  const handleCreateChange = (key: string, value: any) => {
    setCreateForm((prev: any) => ({ ...prev, [key]: value }));
  };
  const saveCreate = async () => {
    if (!createForm) return;
    setSaving(true);
    setSaveError(null);
    try {
      // Only send user_email and assigned_admin (emails), not IDs
      const payload = {
        user_email: createForm.user_email,
        subject: createForm.subject,
        message: createForm.message,
        status: createForm.status,
        priority: createForm.priority,
        assigned_admin: createForm.assigned_admin || null,
        comments: createForm.comments || "",
        closed_at: createForm.closed_at || null
      };
      const res = await fetch(`${API_BASE_URL}/admin/support-tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to create ticket");
      closeCreateDialog();
      window.location.reload();
    } catch (err: any) {
      setSaveError(err.message || "Failed to create ticket");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Support Tickets</h2>
        <p className="text-gray-500">Manage and respond to customer support tickets</p>
      </div>

      <div className="flex flex-col space-y-4 mb-6">
        {/* Add Create New Ticket Button */}
        <div className="flex justify-end mb-2">
          <Button onClick={openCreateDialog} variant="default">Create New Ticket</Button>
        </div>
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
                <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">Loading tickets...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-red-500">{error}</td>
                </tr>
              ) : filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
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
                    <td className="px-4 py-3 text-center">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(ticket)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={!!editTicket} onOpenChange={closeEditDialog}>
        <DialogContent style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <DialogHeader>
            <DialogTitle>Edit Support Ticket</DialogTitle>
          </DialogHeader>
          {editForm && (
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Subject</label>
                <Input value={editForm.subject} onChange={e => handleEditChange('subject', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">User Email</label>
                <Input value={editForm.user_email} onChange={e => handleEditChange('user_email', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Assigned Admin</label>
                <Input value={editForm.assigned_admin || ''} onChange={e => handleEditChange('assigned_admin', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Priority</label>
                <Input value={editForm.priority} onChange={e => handleEditChange('priority', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Status</label>
                <Input value={editForm.status} onChange={e => handleEditChange('status', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Message</label>
                <textarea className="w-full border rounded p-2" rows={4} value={editForm.message} onChange={e => handleEditChange('message', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Comments</label>
                <textarea className="w-full border rounded p-2" rows={4} value={editForm.comments || ''} onChange={e => handleEditChange('comments', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Closed Date</label>
                <Input type="datetime-local" value={editForm.closed_at ? new Date(editForm.closed_at).toISOString().slice(0,16) : ''} onChange={e => handleEditChange('closed_at', e.target.value ? new Date(e.target.value).toISOString() : null)} />
              </div>
              {saveError && <div className="text-red-500 text-sm">{saveError}</div>}
            </form>
          )}
          <DialogFooter>
            <Button onClick={saveEdit} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
            <Button variant="outline" onClick={closeEditDialog}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={createOpen} onOpenChange={closeCreateDialog}>
        <DialogContent style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <DialogHeader>
            <DialogTitle>Create New Support Ticket</DialogTitle>
          </DialogHeader>
          {createForm && (
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Subject</label>
                <Input value={createForm.subject} onChange={e => handleCreateChange('subject', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">User Email</label>
                <Input value={createForm.user_email} onChange={e => handleCreateChange('user_email', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Assigned Admin</label>
                <Input value={createForm.assigned_admin || ''} onChange={e => handleCreateChange('assigned_admin', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Priority</label>
                <Input value={createForm.priority} onChange={e => handleCreateChange('priority', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Status</label>
                <Input value={createForm.status} onChange={e => handleCreateChange('status', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Message</label>
                <textarea className="w-full border rounded p-2" rows={4} value={createForm.message} onChange={e => handleCreateChange('message', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Comments</label>
                <textarea className="w-full border rounded p-2" rows={4} value={createForm.comments || ''} onChange={e => handleCreateChange('comments', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Closed Date</label>
                <Input type="datetime-local" value={createForm.closed_at ? new Date(createForm.closed_at).toISOString().slice(0,16) : ''} onChange={e => handleCreateChange('closed_at', e.target.value ? new Date(e.target.value).toISOString() : null)} />
              </div>
              {saveError && <div className="text-red-500 text-sm">{saveError}</div>}
            </form>
          )}
          <DialogFooter>
            <Button onClick={saveCreate} disabled={saving}>{saving ? "Saving..." : "Create"}</Button>
            <Button variant="outline" onClick={closeCreateDialog}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminSupportPage;
