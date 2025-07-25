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
import { useAdminDashboardStats } from "@/hooks/useAdminDashboardStats";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import ReferralsOverTimeChart from "@/components/charts/ReferralsOverTimeChart";
import TopAffiliatesChart from "@/components/charts/TopAffiliatesChart";
import ReferralConversionRateChart from "@/components/charts/ReferralConversionRateChart";
import CommissionsOverTimeChart from "@/components/charts/CommissionsOverTimeChart";
import {
  useReferralsOverTime,
  useTopAffiliates,
  useReferralConversionRate,
  useCommissionsOverTime,
} from "@/hooks/useAdminReferralsCharts";
import AffiliateDetailsModal from "@/components/charts/AffiliateDetailsModal";
import { useAffiliateDetails } from "@/hooks/useAffiliateDetails";
import { format, parseISO } from "date-fns";

const ReferralSettingsTab = () => {
  const [tier1Commission, setTier1Commission] = useState(20);
  const [tier2Commission, setTier2Commission] = useState(10);
  const [cookieDuration, setCookieDuration] = useState(30);
  const [autoApprove, setAutoApprove] = useState(true);
  const [payoutFrequency, setPayoutFrequency] = useState("monthly");
  const [attributionMethod, setAttributionMethod] = useState("first_click");
  const [preferredPayout, setPreferredPayout] = useState("paypal");
  const [payoutNotes, setPayoutNotes] = useState("For manual payouts, please ensure all affiliate information is complete and verified.");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Load settings from backend on mount
  React.useEffect(() => {
    (async () => {
      try {
        const data = await apiClient.get("/admin/referral-settings");
        setTier1Commission(data.tier1_commission ?? 20);
        setTier2Commission(data.tier2_commission ?? 10);
        setCookieDuration(data.cookie_duration ?? 30);
        setAutoApprove(data.auto_approve ?? true);
        setPayoutFrequency(data.payout_frequency ?? "monthly");
        setAttributionMethod(data.attribution_method ?? "first_click");
        setPreferredPayout(data.preferred_payout ?? "paypal");
        setPayoutNotes(data.payout_notes ?? "For manual payouts, please ensure all affiliate information is complete and verified.");
      } catch (e) {
        // ignore, use defaults
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setSaveError("");
    try {
      await apiClient.post("/admin/referral-settings", {
        tier1_commission: tier1Commission,
        tier2_commission: tier2Commission,
        cookie_duration: cookieDuration,
        auto_approve: autoApprove,
        payout_frequency: payoutFrequency,
        attribution_method: attributionMethod,
        preferred_payout: preferredPayout,
        payout_notes: payoutNotes,
      });
      setSaveSuccess(true);
    } catch (e: any) {
      setSaveError(e.detail || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

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
                <Input id="tier1-commission" type="number" className="pr-8" min="0" max="100" value={tier1Commission} onChange={e => setTier1Commission(Number(e.target.value))} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
              <p className="text-xs text-gray-500">Commission for direct referrals</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="tier2-commission" className="text-sm font-medium">Tier 2 Commission (%)</label>
              <div className="relative">
                <Input id="tier2-commission" type="number" className="pr-8" min="0" max="100" value={tier2Commission} onChange={e => setTier2Commission(Number(e.target.value))} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
              <p className="text-xs text-gray-500">Commission for second-level referrals</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="cookie-duration" className="text-sm font-medium">Cookie Duration (Days)</label>
              <Input id="cookie-duration" type="number" min="1" value={cookieDuration} onChange={e => setCookieDuration(Number(e.target.value))} />
              <p className="text-xs text-gray-500">How long referral tracking cookies remain active</p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="auto-approve" className="h-4 w-4 rounded border-gray-300" checked={autoApprove} onChange={e => setAutoApprove(e.target.checked)} />
                <label htmlFor="auto-approve" className="text-sm font-medium">Auto-approve affiliates</label>
              </div>
              <p className="text-xs text-gray-500">Automatically approve new affiliate applications</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="payout-frequency" className="text-sm font-medium">Payout Frequency</label>
              <Select value={payoutFrequency} onValueChange={setPayoutFrequency}>
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
              <Select value={attributionMethod} onValueChange={setAttributionMethod}>
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
              <Select value={preferredPayout} onValueChange={setPreferredPayout}>
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
                className="w-full min-h-[80px] p-2 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={payoutNotes}
                onChange={e => setPayoutNotes(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-end gap-2">
          <div>
            <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Settings"}</Button>
          </div>
          {saveSuccess && <span className="text-green-600 text-sm">Settings saved!</span>}
          {saveError && <span className="text-red-600 text-sm">{saveError}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

const ReferralPayoutsTab = () => {
  const { filteredPayouts, updatePayoutStatus, isLoading, filterPayouts, payouts } = useAdminReferralsData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all-status");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [displayedPayouts, setDisplayedPayouts] = useState(payouts);

  React.useEffect(() => {
    let filtered = payouts;
    if (statusFilter && statusFilter !== "all-status") {
      filtered = filtered.filter(p => p.status === statusFilter);
    }
    if (searchTerm.trim()) {
      filtered = filtered.filter(p =>
        p.affiliate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (dateFrom) {
      filtered = filtered.filter(p => new Date(p.created_at) >= new Date(dateFrom));
    }
    if (dateTo) {
      filtered = filtered.filter(p => new Date(p.created_at) <= new Date(dateTo));
    }
    filterPayouts(statusFilter, searchTerm); // still call for hook state
    setDisplayedPayouts(filtered);
  }, [statusFilter, searchTerm, dateFrom, dateTo, payouts]);

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
        <div className="flex gap-2 items-center">
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
          <div className="flex items-center gap-1">
            <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="w-[130px]" />
            <span className="mx-1">to</span>
            <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="w-[130px]" />
          </div>
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
              {displayedPayouts.map((payout) => (
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
        {displayedPayouts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No payouts found matching your search criteria
          </div>
        )}
      </Card>
    </div>
  );
};

const ReferralReportsTab = () => {
  const { stats, isLoading } = useAdminDashboardStats();
  const { data: referralsOverTime, loading: loadingReferrals } = useReferralsOverTime();
  const { data: topAffiliates, loading: loadingAffiliates } = useTopAffiliates();
  const { rate: conversionRate, loading: loadingConversion } = useReferralConversionRate();
  const { data: commissionsOverTime, loading: loadingCommissions } = useCommissionsOverTime();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAffiliateId, setSelectedAffiliateId] = useState<string | null>(null);
  const { affiliate, loading: loadingDetails, fetchAffiliate } = useAffiliateDetails();

  const handleAffiliateClick = (id: string) => {
    setSelectedAffiliateId(id);
    setModalOpen(true);
    fetchAffiliate(id);
  };

  if (isLoading || !stats) {
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
                <div className="mt-2 text-xs text-blue-700 flex flex-wrap gap-2">
                  <span>+{stats.affiliates_breakdown.today} today</span>
                  <span>+{stats.affiliates_breakdown.week} week</span>
                  <span>+{stats.affiliates_breakdown.month} month</span>
                  <span>+{stats.affiliates_breakdown.year} year</span>
                </div>
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
                <div className="mt-2 text-xs text-purple-700 flex flex-wrap gap-2">
                  <span>+{stats.referrals_breakdown.today} today</span>
                  <span>+{stats.referrals_breakdown.week} week</span>
                  <span>+{stats.referrals_breakdown.month} month</span>
                  <span>+{stats.referrals_breakdown.year} year</span>
                </div>
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
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card>
          <CardHeader><CardTitle>Referrals Over Time</CardTitle></CardHeader>
          <CardContent>
            {loadingReferrals ? <LoadingSpinner /> : <ReferralsOverTimeChart data={referralsOverTime} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Top Affiliates</CardTitle></CardHeader>
          <CardContent>
            {loadingAffiliates ? <LoadingSpinner /> : (
              <TopAffiliatesChart
                data={topAffiliates.map((a: any) => ({ ...a, id: a.id }))}
                onNameClick={handleAffiliateClick}
              />
            )}
            <AffiliateDetailsModal
              open={modalOpen}
              onOpenChange={setModalOpen}
              affiliate={affiliate}
              loading={loadingDetails}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Referral Conversion Rate</CardTitle></CardHeader>
          <CardContent>
            {loadingConversion ? <LoadingSpinner /> : <ReferralConversionRateChart rate={conversionRate} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Commissions Paid Over Time</CardTitle></CardHeader>
          <CardContent>
            {loadingCommissions ? <LoadingSpinner /> : <CommissionsOverTimeChart data={commissionsOverTime} />}
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
  const { filteredAffiliates, filterAffiliates, isLoading, handleSort: hookHandleSort, sortField, sortOrder } = useAdminReferralsData();
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterAffiliates(e.target.value);
  };

  const handleSort = (field: 'name' | 'email' | 'referral_code' | 'total_referrals' | 'total_earnings' | 'created_at') => {
    hookHandleSort(field);
  };
  
  if (isLoading) {
    return <div className="flex justify-center my-12"><LoadingSpinner size="lg" /></div>;
  }
  
  const getSortIcon = (key: string) => {
    if (key !== sortField) return '↕';
    return sortOrder === 'asc' ? '↑' : '↓';
  };
  
  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search affiliates..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('name')}
                >
                  Name {getSortIcon('name')}
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('email')}
                >
                  Email {getSortIcon('email')}
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('referral_code')}
                >
                  Code {getSortIcon('referral_code')}
                </th>
                <th
                  className="px-4 py-3 text-right text-sm font-semibold cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('total_referrals')}
                >
                  Total Referrals {getSortIcon('total_referrals')}
                </th>
                <th
                  className="px-4 py-3 text-right text-sm font-semibold cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('total_earnings')}
                >
                  Total Earnings {getSortIcon('total_earnings')}
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('created_at')}
                >
                  Joined {getSortIcon('created_at')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAffiliates.map((affiliate) => (
                <tr key={affiliate.id} className="border-b last:border-b-0">
                  <td className="px-4 py-3 text-sm">
                    {affiliate.name || affiliate.email || 'Unknown'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {affiliate.email}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {affiliate.referral_code}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    {affiliate.total_referrals || 0}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    ${(affiliate.total_earnings || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(affiliate.created_at).toLocaleDateString()}
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
        <p className="text-gray-500">Manage referral settings, affiliate payouts, and performance reports</p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <ReferralReportsTab />
        </TabsContent>
        <TabsContent value="payouts">
          <ReferralPayoutsTab />
        </TabsContent>
        <TabsContent value="affiliates">
          <AffiliatesTab />
        </TabsContent>
        <TabsContent value="settings">
          <ReferralSettingsTab />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminReferralsPage;
