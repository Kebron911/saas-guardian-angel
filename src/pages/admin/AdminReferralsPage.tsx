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
  BarChart,
  User
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
import { useAdminReferralsData } from "@/hooks/useAdminReferralsData";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

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
  const { filteredPayouts, updatePayoutStatus, isLoading } = useAdminReferralsData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all-status");

  const handleActionClick = async (action: string, payoutId: string) => {
    console.log(`${action} payout ${payoutId}`);
    
    if (action === 'mark-paid') {
      try {
        await updatePayoutStatus(payoutId, 'paid');
      } catch (error) {
        console.error("Failed to update payout status:", error);
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center my-12"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search affiliates..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
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
              {filteredPayouts.map((payout) => (
                <tr key={payout.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{payout.id.substring(0, 8)}...</td>
                  <td className="px-4 py-3 text-sm">{payout.affiliate_name}</td>
                  <td className="px-4 py-3 text-sm">{payout.email}</td>
                  <td className="px-4 py-3 text-sm text-right">${payout.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      payout.status === 'paid' ? 'bg-green-100 text-green-800' :
                      payout.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      payout.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payout.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{new Date(payout.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      {payout.status === 'pending' && (
                        <Button variant="ghost" size="icon" onClick={() => handleActionClick('mark-paid', payout.id)}>
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
        {filteredPayouts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No payouts found matching your search criteria
          </div>
        )}
      </Card>
    </div>
  );
};

const ReferralReportsTab = () => {
  const { stats, isLoading } = useAdminReferralsData();

  if (isLoading) {
    return <div className="flex justify-center my-12"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Affiliates</p>
                <h3 className="text-2xl font-bold mt-1">{stats.total_affiliates}</h3>
                <p className="text-xs text-green-600 mt-1">Live data</p>
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
                <h3 className="text-2xl font-bold mt-1">{stats.total_referrals}</h3>
                <p className="text-xs text-green-600 mt-1">Live data</p>
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
                <h3 className="text-2xl font-bold mt-1">${stats.total_revenue.toLocaleString()}</h3>
                <p className="text-xs text-green-600 mt-1">Live data</p>
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
                <h3 className="text-2xl font-bold mt-1">${stats.total_commissions.toLocaleString()}</h3>
                <p className="text-xs text-green-600 mt-1">Live data</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Settings className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
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

const AffiliatesTab = () => {
  const { filteredAffiliates, filterAffiliates, isLoading } = useAdminReferralsData();
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterAffiliates(term);
  };
  
  if (isLoading) {
    return <div className="flex justify-center my-12"><LoadingSpinner size="lg" /></div>;
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search affiliates..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <span>More Filters</span>
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
                <th className="px-4 py-3 text-left text-sm font-semibold">Affiliate</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Referral Code</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Commission Rate</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Total Referrals</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Total Earnings</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filteredAffiliates.map((affiliate) => (
                <tr key={affiliate.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{affiliate.name}</td>
                  <td className="px-4 py-3 text-sm">{affiliate.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {affiliate.referral_code || 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{Math.round(affiliate.commission_rate * 100)}%</td>
                  <td className="px-4 py-3 text-sm text-center">{affiliate.total_referrals}</td>
                  <td className="px-4 py-3 text-sm text-right">${affiliate.total_earnings.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{new Date(affiliate.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAffiliates.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No affiliates found matching your search
          </div>
        )}
      </Card>
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
          <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="settings">
          <ReferralSettingsTab />
        </TabsContent>
        <TabsContent value="payouts">
          <ReferralPayoutsTab />
        </TabsContent>
        <TabsContent value="affiliates">
          <AffiliatesTab />
        </TabsContent>
        <TabsContent value="reports">
          <ReferralReportsTab />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminReferralsPage;
