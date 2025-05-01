
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Filter,
  ChevronDown,
  Search,
  Download,
  Check,
  Eye,
  TrendingUp,
  Users,
  Settings,
  BarChart
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data
const referralPayoutsData = [
  { id: "PAY-5928", affiliate: "Lisa Garcia", email: "lisa@example.com", amount: 240.50, status: "Paid", date: "2025-04-10" },
  { id: "PAY-5927", affiliate: "Michael Brown", email: "michael@example.com", amount: 387.25, status: "Pending", date: "2025-04-10" },
  { id: "PAY-5926", affiliate: "David Wilson", email: "david@example.com", amount: 128.75, status: "Pending", date: "2025-04-10" },
  { id: "PAY-5925", affiliate: "Jennifer Lee", email: "jennifer@example.com", amount: 95.20, status: "Processing", date: "2025-04-09" },
  { id: "PAY-5924", affiliate: "Robert Taylor", email: "robert@example.com", amount: 312.40, status: "Paid", date: "2025-03-15" },
  { id: "PAY-5923", affiliate: "Sarah Johnson", email: "sarah@example.com", amount: 215.80, status: "Paid", date: "2025-03-15" },
  { id: "PAY-5922", affiliate: "John Smith", email: "john@example.com", amount: 154.30, status: "Failed", date: "2025-03-15" }
];

// Sample data for reports
const topAffiliatesData = [
  { id: 1, name: "Lisa Garcia", email: "lisa@example.com", referrals: 42, revenue: 8275.50, commission: 1241.33 },
  { id: 2, name: "Michael Brown", email: "michael@example.com", referrals: 36, revenue: 6840.75, commission: 1026.11 },
  { id: 3, name: "Sarah Johnson", email: "sarah@example.com", referrals: 29, revenue: 5510.40, commission: 826.56 },
  { id: 4, name: "David Wilson", email: "david@example.com", referrals: 23, revenue: 4370.25, commission: 655.54 },
  { id: 5, name: "Jennifer Lee", email: "jennifer@example.com", referrals: 18, revenue: 3420.80, commission: 513.12 }
];

const monthlyStats = [
  { month: "Jan", referrals: 24, revenue: 4560, commissions: 684 },
  { month: "Feb", referrals: 32, revenue: 6080, commissions: 912 },
  { month: "Mar", referrals: 38, revenue: 7220, commissions: 1083 },
  { month: "Apr", referrals: 45, revenue: 8550, commissions: 1282.5 },
  { month: "May", referrals: 52, revenue: 9880, commissions: 1482 },
];

const ReferralSettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Referral Program Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="tier1-commission" className="text-sm font-medium">Tier 1 Commission (%)</label>
              <div className="relative">
                <Input id="tier1-commission" type="number" className="pr-8" defaultValue="20" min="0" max="100" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
              <p className="text-xs text-gray-500">Commission for direct referrals</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tier2-commission" className="text-sm font-medium">Tier 2 Commission (%)</label>
              <div className="relative">
                <Input id="tier2-commission" type="number" className="pr-8" defaultValue="10" min="0" max="100" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
              <p className="text-xs text-gray-500">Commission for second-level referrals</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cookie-duration" className="text-sm font-medium">Cookie Duration (Days)</label>
              <Input id="cookie-duration" type="number" defaultValue="30" min="1" />
              <p className="text-xs text-gray-500">How long referral tracking cookies remain active</p>
            </div>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="auto-approve" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                <label htmlFor="auto-approve" className="text-sm font-medium">Auto-approve affiliates</label>
              </div>
              <p className="text-xs text-gray-500">Automatically approve new affiliate applications</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="payout-frequency" className="text-sm font-medium">Payout Frequency</label>
              <Select defaultValue="monthly">
                <SelectTrigger id="payout-frequency">
                  <SelectValue placeholder="Select Frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="attribution-method" className="text-sm font-medium">Attribution Method</label>
              <Select defaultValue="first_click">
                <SelectTrigger id="attribution-method">
                  <SelectValue placeholder="Select Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first_click">First Click</SelectItem>
                  <SelectItem value="last_click">Last Click</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">Determines which affiliate gets credit for the referral</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="preferred-payout" className="text-sm font-medium">Preferred Payout Method</label>
              <Select defaultValue="paypal">
                <SelectTrigger id="preferred-payout">
                  <SelectValue placeholder="Select Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="payout-notes" className="text-sm font-medium">Manual Payout Notes</label>
              <textarea 
                id="payout-notes" 
                rows={3} 
                className="w-full min-h-[80px] p-2 border border-gray-300 rounded-md"
                defaultValue="For manual payouts, please ensure all affiliate information is complete and verified."
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ReferralPayoutsTab = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search affiliates..."
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="all-status">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <span>Date Range</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold">Payout ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Affiliate</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {referralPayoutsData.map((payout) => (
                <tr key={payout.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{payout.id}</td>
                  <td className="px-4 py-3 text-sm">{payout.affiliate}</td>
                  <td className="px-4 py-3 text-sm">{payout.email}</td>
                  <td className="px-4 py-3 text-sm text-right">${payout.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      payout.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      payout.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      payout.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payout.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{payout.date}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      {payout.status === 'Pending' && (
                        <Button variant="ghost" size="icon">
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Mark as Paid</span>
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
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

const ReferralReportsTab = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Affiliates</p>
                <h3 className="text-2xl font-bold mt-1">127</h3>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Referrals</p>
                <h3 className="text-2xl font-bold mt-1">865</h3>
                <p className="text-xs text-green-600 mt-1">+8% from last month</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">$164,320</h3>
                <p className="text-xs text-green-600 mt-1">+15% from last month</p>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <BarChart className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Commissions Paid</p>
                <h3 className="text-2xl font-bold mt-1">$24,648</h3>
                <p className="text-xs text-green-600 mt-1">+6% from last month</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Settings className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Monthly Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500 text-sm">Monthly performance chart placeholder</p>
              {/* In a real app, we'd use recharts library here */}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Top Affiliates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Affiliates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Referrals</TableHead>
                <TableHead className="text-right">Revenue Generated</TableHead>
                <TableHead className="text-right">Commission Earned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topAffiliatesData.map((affiliate) => (
                <TableRow key={affiliate.id}>
                  <TableCell className="font-medium">{affiliate.name}</TableCell>
                  <TableCell>{affiliate.email}</TableCell>
                  <TableCell className="text-right">{affiliate.referrals}</TableCell>
                  <TableCell className="text-right">${affiliate.revenue.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${affiliate.commission.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Monthly Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Stats (2025)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">New Referrals</TableHead>
                <TableHead className="text-right">Revenue Generated</TableHead>
                <TableHead className="text-right">Commissions Paid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyStats.map((stat) => (
                <TableRow key={stat.month}>
                  <TableCell className="font-medium">{stat.month}</TableCell>
                  <TableCell className="text-right">{stat.referrals}</TableCell>
                  <TableCell className="text-right">${stat.revenue.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${stat.commissions.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Export Reports Section */}
      <div className="flex justify-end">
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export All Reports
        </Button>
      </div>
    </div>
  );
};

const AdminReferralsPage = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Referral Program</h2>
        <p className="text-gray-500">Manage referral settings, affiliate payouts, and performance reports</p>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="settings">
          <ReferralSettingsTab />
        </TabsContent>
        <TabsContent value="payouts">
          <ReferralPayoutsTab />
        </TabsContent>
        <TabsContent value="reports">
          <ReferralReportsTab />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminReferralsPage;
