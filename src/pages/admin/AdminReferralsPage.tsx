
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
  Eye
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
const referralPayoutsData = [
  { id: "PAY-5928", affiliate: "Lisa Garcia", email: "lisa@example.com", amount: 240.50, status: "Paid", date: "2025-04-10" },
  { id: "PAY-5927", affiliate: "Michael Brown", email: "michael@example.com", amount: 387.25, status: "Pending", date: "2025-04-10" },
  { id: "PAY-5926", affiliate: "David Wilson", email: "david@example.com", amount: 128.75, status: "Pending", date: "2025-04-10" },
  { id: "PAY-5925", affiliate: "Jennifer Lee", email: "jennifer@example.com", amount: 95.20, status: "Processing", date: "2025-04-09" },
  { id: "PAY-5924", affiliate: "Robert Taylor", email: "robert@example.com", amount: 312.40, status: "Paid", date: "2025-03-15" },
  { id: "PAY-5923", affiliate: "Sarah Johnson", email: "sarah@example.com", amount: 215.80, status: "Paid", date: "2025-03-15" },
  { id: "PAY-5922", affiliate: "John Smith", email: "john@example.com", amount: 154.30, status: "Failed", date: "2025-03-15" }
];

const ReferralSettingsTab = () => {
  return (
    <div className="space-y-6">
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
                <label htmlFor="payout-threshold" className="text-sm font-medium">Payout Threshold</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                  <Input id="payout-threshold" type="number" className="pl-7" defaultValue="50" min="0" />
                </div>
                <p className="text-xs text-gray-500">Minimum amount required for payout</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="payout-delay" className="text-sm font-medium">Payout Delay (Days)</label>
                <Input id="payout-delay" type="number" defaultValue="30" min="0" />
                <p className="text-xs text-gray-500">Days to wait before processing commission payouts</p>
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="auto-approve" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                  <label htmlFor="auto-approve" className="text-sm font-medium">Auto-approve payouts</label>
                </div>
                <p className="text-xs text-gray-500">Automatically approve payouts that meet the threshold</p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">Program Notes</label>
                <textarea 
                  id="notes" 
                  rows={3} 
                  className="w-full min-h-[80px] p-2 border border-gray-300 rounded-md"
                  placeholder="Additional notes about the referral program"
                  defaultValue="Referral commissions are calculated based on the first payment of the referred customer. Monthly payouts occur on the 15th of each month."
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
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

const AdminReferralsPage = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Referral Program</h2>
        <p className="text-gray-500">Manage referral settings and affiliate payouts</p>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
        </TabsList>
        <TabsContent value="settings">
          <ReferralSettingsTab />
        </TabsContent>
        <TabsContent value="payouts">
          <ReferralPayoutsTab />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminReferralsPage;
