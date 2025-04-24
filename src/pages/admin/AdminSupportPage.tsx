
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import {
  Search,
  Filter,
  ChevronDown,
  MessageCircle,
  AlertCircle,
  Clock,
  CheckCircle
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
const supportTicketsData = [
  { id: "TKT-3821", user: "John Smith", subject: "Account Login Issue", status: "Open", lastUpdated: "2025-04-23 10:22", assignedAdmin: "Sarah Johnson", priority: "High" },
  { id: "TKT-3820", user: "Jennifer Lee", subject: "Subscription Cancellation", status: "In Progress", lastUpdated: "2025-04-22 15:45", assignedAdmin: "David Wilson", priority: "Medium" },
  { id: "TKT-3819", user: "Michael Brown", subject: "Feature Request", status: "In Progress", lastUpdated: "2025-04-21 09:12", assignedAdmin: "Lisa Garcia", priority: "Low" },
  { id: "TKT-3818", user: "Lisa Garcia", subject: "Payment Failed", status: "Open", lastUpdated: "2025-04-20 14:28", assignedAdmin: null, priority: "High" },
  { id: "TKT-3817", user: "David Wilson", subject: "API Integration Help", status: "Waiting for Customer", lastUpdated: "2025-04-18 11:05", assignedAdmin: "Sarah Johnson", priority: "Medium" },
  { id: "TKT-3816", user: "Robert Taylor", subject: "Account Suspension Question", status: "Closed", lastUpdated: "2025-04-16 16:33", assignedAdmin: "David Wilson", priority: "Medium" },
  { id: "TKT-3815", user: "Emily Martinez", subject: "Reset Password Not Working", status: "Closed", lastUpdated: "2025-04-15 08:47", assignedAdmin: "Lisa Garcia", priority: "High" },
];

const AdminSupportPage = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Support Tickets</h2>
        <p className="text-gray-500">Manage and respond to customer support tickets</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search tickets..."
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select defaultValue="all-status">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="waiting">Waiting for Customer</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all-admins">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Admins" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-admins">All Admins</SelectItem>
              <SelectItem value="sarah">Sarah Johnson</SelectItem>
              <SelectItem value="david">David Wilson</SelectItem>
              <SelectItem value="lisa">Lisa Garcia</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all-priority">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-priority">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <span>Date Range</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
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
              {supportTicketsData.map((ticket) => (
                <tr key={ticket.id} className="border-b hover:bg-gray-50 cursor-pointer">
                  <td className="px-4 py-3 text-sm font-medium">{ticket.id}</td>
                  <td className="px-4 py-3 text-sm">{ticket.user}</td>
                  <td className="px-4 py-3 text-sm">{ticket.subject}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      ticket.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                      ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'Waiting for Customer' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status === 'Open' && <MessageCircle className="h-3 w-3" />}
                      {ticket.status === 'In Progress' && <Clock className="h-3 w-3" />}
                      {ticket.status === 'Waiting for Customer' && <AlertCircle className="h-3 w-3" />}
                      {ticket.status === 'Closed' && <CheckCircle className="h-3 w-3" />}
                      <span>{ticket.status}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{ticket.lastUpdated}</td>
                  <td className="px-4 py-3 text-sm">
                    {ticket.assignedAdmin ? (
                      <span>{ticket.assignedAdmin}</span>
                    ) : (
                      <span className="text-gray-400">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className={`inline-block w-3 h-3 rounded-full ${
                      ticket.priority === 'High' ? 'bg-red-500' :
                      ticket.priority === 'Medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}></span>
                    <span className="sr-only">{ticket.priority}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing 7 of 124 tickets
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </AdminLayout>
  );
};

export default AdminSupportPage;
