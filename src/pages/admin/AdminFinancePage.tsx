import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart3,
  DollarSign,
  Users,
  Tag,
  Search,
  Filter,
  ChevronDown,
  Plus,
  Star,
  Edit,
  Trash2
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAdminFinanceData, PromoCodeCreate } from "@/hooks/useAdminFinanceData";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import FinanceRevenueTimelineChart from "@/components/charts/FinanceRevenueTimelineChart";
import RevenueByPlanChart from "@/components/charts/RevenueByPlanChart";
import { useFinanceStats } from "@/hooks/useFinanceStats";
import { useAdminDashboardStats } from "@/hooks/useAdminDashboardStats";
import PlanFormDialog from "@/components/admin/PlanFormDialog";
import { updatePlan, createPlan, softDeletePlan } from "@/lib/plan-api";

const PromoCodeDialog = ({ onCreatePromoCode, open, setOpen, initialData, isEdit }: { onCreatePromoCode: (data: PromoCodeCreate) => void, open: boolean, setOpen: (open: boolean) => void, initialData?: PromoCodeCreate, isEdit?: boolean }) => {
  const [formData, setFormData] = useState<PromoCodeCreate>(initialData || {
    code: '',
    discount_percent: 0,
    expiration_date: '',
    max_uses: undefined,
    status: 'active'
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreatePromoCode(formData);
    setOpen(false);
    setFormData({
      code: '',
      discount_percent: 0,
      expiration_date: '',
      max_uses: undefined,
      status: 'active'
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isEdit && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Promo Code
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit' : 'Create New'} Promo Code</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the details of the promo code.' : 'Add a new promotional code to your system.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount" className="text-right">
                Discount %
              </Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                value={formData.discount_percent}
                onChange={(e) => setFormData({ ...formData, discount_percent: parseFloat(e.target.value) })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiration" className="text-right">
                Expiration
              </Label>
              <Input
                id="expiration"
                type="datetime-local"
                value={formData.expiration_date}
                onChange={(e) => setFormData({ ...formData, expiration_date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxUses" className="text-right">
                Max Uses
              </Label>
              <Input
                id="maxUses"
                type="number"
                min="1"
                value={formData.max_uses || ''}
                onChange={(e) => setFormData({ ...formData, max_uses: e.target.value ? parseInt(e.target.value) : undefined })}
                className="col-span-3"
                placeholder="Unlimited"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{isEdit ? 'Update' : 'Create'} Promo Code</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const FinanceDashboardTab = () => {
  const { stats: financeStats, isLoading: statsLoading, error: statsError } = useAdminDashboardStats();
  const { stats, isLoading, error } = useFinanceStats();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-10 w-32 bg-gray-200 animate-pulse rounded" />
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : stats ? (
              <>
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 mr-3 text-green-600" />
                  <div className="text-3xl font-bold">${stats.monthly_revenue.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
                </div>
                <div className={`mt-2 text-sm ${stats.percent_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{stats.percent_change >= 0 ? '+' : ''}{stats.percent_change.toFixed(1)}% from last month</div>
              </>
            ) : null}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="h-10 w-32 bg-gray-200 animate-pulse rounded" />
            ) : statsError ? (
              <div className="text-red-500">{statsError}</div>
            ) : financeStats ? (
              <>
                <div className="flex items-center">
                  <Users className="w-8 h-8 mr-3 text-blue-600" />
                  <div className="text-3xl font-bold">{financeStats.active_subscriptions.toLocaleString()}</div>
                </div>
                <div className="mt-2 text-xs text-blue-700 flex flex-wrap gap-2">
                  <span>+{financeStats.active_subscriptions_breakdown.today} today</span>
                  <span>+{financeStats.active_subscriptions_breakdown.week} week</span>
                  <span>+{financeStats.active_subscriptions_breakdown.month} month</span>
                  <span>+{financeStats.active_subscriptions_breakdown.year} year</span>
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Promo Usage</CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="h-10 w-32 bg-gray-200 animate-pulse rounded" />
            ) : statsError ? (
              <div className="text-red-500">{statsError}</div>
            ) : financeStats ? (
              <>
                <div className="flex items-center">
                  <Tag className="w-8 h-8 mr-3 text-purple-600" />
                  <div className="text-3xl font-bold">{financeStats.promo_usage.toLocaleString()}</div>
                </div>
                <div className="mt-2 text-xs text-purple-700 flex flex-wrap gap-2">
                  <span>+{financeStats.promo_usage_breakdown.today} today</span>
                  <span>+{financeStats.promo_usage_breakdown.week} week</span>
                  <span>+{financeStats.promo_usage_breakdown.month} month</span>
                  <span>+{financeStats.promo_usage_breakdown.year} year</span>
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="h-10 w-32 bg-gray-200 animate-pulse rounded" />
            ) : statsError ? (
              <div className="text-red-500">{statsError}</div>
            ) : financeStats ? (
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 mr-3 text-amber-600" />
                <div className="text-3xl font-bold">${financeStats.commissions_paid.toLocaleString()}</div>
              </div>
            ) : null}
            <div className="mt-2 text-sm text-gray-500">Affiliate commissions</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Timeline</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <FinanceRevenueTimelineChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Plan</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <RevenueByPlanChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const TransactionsTab = () => {
  const { transactions, fetchTransactions, isLoading } = useAdminFinanceData();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all-types");
  const [statusFilter, setStatusFilter] = useState("all-status");

  // Compute unique types and statuses from transactions
  const typeOptions = Array.from(new Set(transactions.map(t => t.type))).filter(Boolean);
  const statusOptions = Array.from(new Set(transactions.map(t => t.status))).filter(Boolean);

  const handleSearch = () => {
    fetchTransactions(searchTerm, typeFilter, statusFilter);
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
            placeholder="Search transactions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All Types</SelectItem>
              {typeOptions.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              {statusOptions.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button onClick={handleSearch} variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold">Transaction ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">User</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Gateway</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Created At</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{transaction.id.substring(0, 8)}...</td>
                  <td className="px-4 py-3 text-sm">{transaction.user_name}</td>
                  <td className="px-4 py-3 text-sm">{transaction.email}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <span className={transaction.type === 'Refund' ? 'text-red-600' : 'text-gray-900'}>
                      ${transaction.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      transaction.type === 'Subscription' ? 'bg-blue-100 text-blue-800' :
                      transaction.type === 'Upgrade' ? 'bg-green-100 text-green-800' :
                      transaction.type === 'Refund' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'Failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{transaction.gateway}</td>
                  <td className="px-4 py-3 text-sm">{new Date(transaction.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {transactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No transactions found matching your search criteria
          </div>
        )}
      </Card>
    </div>
  );
};

const PlansTab = () => {
  const { plans, fetchPlans, isLoading } = useAdminFinanceData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all-status");
  const [editingPlan, setEditingPlan] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleSearch = () => {
    fetchPlans(searchTerm, statusFilter);
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setEditDialogOpen(true);
  };

  const handleSave = async (data) => {
    if (editingPlan) {
      await updatePlan(editingPlan.id, data);
      setEditingPlan(null);
      setEditDialogOpen(false);
    } else {
      await createPlan(data);
      setCreating(false);
    }
    fetchPlans();
  };

  const handleDelete = async (planId) => {
    await softDeletePlan(planId);
    fetchPlans();
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
            placeholder="Search plans..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleSearch} variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          {/* Create New Plan Button */}
          <PlanFormDialog
            trigger={
              <Button onClick={() => { setEditingPlan(null); setEditDialogOpen(true); }}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Plan
              </Button>
            }
            plan={null}
            onSave={handleSave}
            open={editDialogOpen && !editingPlan}
            setOpen={setEditDialogOpen}
          />
        </div>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold">Plan Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Price & Duration</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Subscriber Count</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{plan.name}</td>
                  <td className="px-4 py-3 text-sm">${plan.price} / {plan.duration}</td>
                  <td className="px-4 py-3 text-sm">{plan.description}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      plan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{plan.subscriber_count}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      <PlanFormDialog
                        trigger={
                          <Button variant="ghost" size="icon" onClick={() => { setEditingPlan(plan); setEditDialogOpen(true); }}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        }
                        plan={editingPlan && editingPlan.id === plan.id ? editingPlan : null}
                        onSave={handleSave}
                        open={editDialogOpen && editingPlan && editingPlan.id === plan.id}
                        setOpen={setEditDialogOpen}
                      />
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(plan.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {plans.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No plans found matching your search criteria
          </div>
        )}
      </Card>
    </div>
  );
};

const SubscriptionsTab = () => {
  const { subscriptions, fetchSubscriptions, isLoading } = useAdminFinanceData();
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("all-plans");
  const [statusFilter, setStatusFilter] = useState("all-status");

  const handleSearch = () => {
    fetchSubscriptions(searchTerm, planFilter, statusFilter);
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
            placeholder="Search subscriptions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Plans" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-plans">All Plans</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="trialing">Trial</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleSearch} variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold">User</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Plan</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Start Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">End Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Gateway</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Auto-Renew</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{subscription.user_name}</td>
                  <td className="px-4 py-3 text-sm">{subscription.plan_name}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      subscription.status === 'active' ? 'bg-green-100 text-green-800' :
                      subscription.status === 'inactive' ? 'bg-red-100 text-red-800' :
                      subscription.status === 'canceled' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {subscription.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {subscription.current_period_start ? new Date(subscription.current_period_start).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {subscription.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm">{subscription.stripe_customer_id ? 'Stripe' : 'Manual'}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    {subscription.auto_renew ? (
                      <span className="inline-block h-4 w-4 rounded-full bg-green-500"></span>
                    ) : (
                      <span className="inline-block h-4 w-4 rounded-full bg-gray-300"></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {subscriptions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No subscriptions found matching your search criteria
          </div>
        )}
      </Card>
    </div>
  );
};

const PromoCodesTab = () => {
  const { promoCodes, fetchPromoCodes, createPromoCode, softDeletePromoCode, isLoading } = useAdminFinanceData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all-status");
  const [editingPromo, setEditingPromo] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleSearch = () => {
    fetchPromoCodes(searchTerm, statusFilter);
  };

  const handleCreatePromoCode = async (data: PromoCodeCreate) => {
    try {
      await createPromoCode(data);
    } catch (error) {
      console.error("Failed to create promo code:", error);
    }
  };

  const handleEditPromoCode = (promo) => {
    setEditingPromo(promo);
    setEditDialogOpen(true);
  };

  const handleSaveEditPromoCode = async (data) => {
    try {
      // PATCH or PUT to /admin/promo-codes/{id} (implement if not present)
      await apiClient.put(`/admin/promo-codes/${editingPromo.id}`, data);
      setEditDialogOpen(false);
      setEditingPromo(null);
      await fetchPromoCodes();
    } catch (error) {
      console.error("Failed to update promo code:", error);
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
            placeholder="Search promo codes..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleSearch} variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          
          {/* Create New Promo Code Button */}
          <PromoCodeDialog
            onCreatePromoCode={handleCreatePromoCode}
            open={editDialogOpen}
            setOpen={setEditDialogOpen}
            initialData={editingPromo}
            isEdit={!!editingPromo}
          />
        </div>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold">Code</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Discount %</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Expiration</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Usage</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Max Uses</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promoCodes.map((promo) => (
                <tr key={promo.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{promo.code}</td>
                  <td className="px-4 py-3 text-sm">{promo.discount_percent}%</td>
                  <td className="px-4 py-3 text-sm">{promo.expiration_date ? new Date(promo.expiration_date).toLocaleDateString() : 'Never'}</td>
                  <td className="px-4 py-3 text-sm">{promo.usage_count}</td>
                  <td className="px-4 py-3 text-sm">{promo.max_uses || 'Unlimited'}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      promo.status === 'active' ? 'bg-green-100 text-green-800' :
                      promo.status === 'expired' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {promo.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditPromoCode(promo)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={async () => {
                        try {
                          await softDeletePromoCode(promo.id);
                        } catch {}
                      }}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {promoCodes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No promo codes found matching your search criteria
          </div>
        )}
      </Card>
    </div>
  );
};

const FinanceSettingsTab = () => {
  const [defaultCurrency, setDefaultCurrency] = useState("usd");
  const [currencyFormat, setCurrencyFormat] = useState("before");
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [stripeSecretKey, setStripeSecretKey] = useState("");
  const [paypalClientId, setPaypalClientId] = useState("");
  const [paypalSecret, setPaypalSecret] = useState("");
  const [minPayout, setMinPayout] = useState(50);
  const [autoPayouts, setAutoPayouts] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  React.useEffect(() => {
    (async () => {
      try {
        const data = await apiClient.get("/admin/finance-settings");
        setDefaultCurrency(data.default_currency ?? "usd");
        setCurrencyFormat(data.currency_format ?? "before");
        setStripeApiKey(data.stripe_api_key ?? "");
        setStripeSecretKey(data.stripe_secret_key ?? "");
        setPaypalClientId(data.paypal_client_id ?? "");
        setPaypalSecret(data.paypal_secret ?? "");
        setMinPayout(data.min_payout ?? 50);
        setAutoPayouts(data.auto_payouts ?? true);
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
      await apiClient.post("/admin/finance-settings", {
        default_currency: defaultCurrency,
        currency_format: currencyFormat,
        stripe_api_key: stripeApiKey,
        stripe_secret_key: stripeSecretKey,
        paypal_client_id: paypalClientId,
        paypal_secret: paypalSecret,
        min_payout: minPayout,
        auto_payouts: autoPayouts,
      });
      setSaveSuccess(true);
    } catch (e) {
      setSaveError(e.detail || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Currency Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="default-currency" className="text-sm font-medium">Default Currency</label>
              <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                <SelectTrigger id="default-currency">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD - US Dollar</SelectItem>
                  <SelectItem value="eur">EUR - Euro</SelectItem>
                  <SelectItem value="gbp">GBP - British Pound</SelectItem>
                  <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="aud">AUD - Australian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="currency-format" className="text-sm font-medium">Currency Format</label>
              <Select value={currencyFormat} onValueChange={setCurrencyFormat}>
                <SelectTrigger id="currency-format">
                  <SelectValue placeholder="Select Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="before">Symbol before amount ($100)</SelectItem>
                  <SelectItem value="after">Symbol after amount (100$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Gateways</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Stripe</h3>
                <div className="flex items-center">
                  <span className="text-sm text-green-600 font-medium mr-2">{stripeApiKey && stripeSecretKey ? "Connected" : "Not Connected"}</span>
                  <div className={`h-3 w-3 rounded-full ${stripeApiKey && stripeSecretKey ? "bg-green-500" : "bg-gray-400"}`}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="stripe-api-key" className="text-sm font-medium">API Key</label>
                  <Input id="stripe-api-key" type="password" value={stripeApiKey} onChange={e => setStripeApiKey(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="stripe-secret-key" className="text-sm font-medium">Secret Key</label>
                  <Input id="stripe-secret-key" type="password" value={stripeSecretKey} onChange={e => setStripeSecretKey(e.target.value)} />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">PayPal</h3>
                <div className="flex items-center">
                  <span className="text-sm text-green-600 font-medium mr-2">{paypalClientId && paypalSecret ? "Connected" : "Not Connected"}</span>
                  <div className={`h-3 w-3 rounded-full ${paypalClientId && paypalSecret ? "bg-green-500" : "bg-gray-400"}`}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="paypal-client-id" className="text-sm font-medium">Client ID</label>
                  <Input id="paypal-client-id" type="password" value={paypalClientId} onChange={e => setPaypalClientId(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="paypal-secret" className="text-sm font-medium">Client Secret</label>
                  <Input id="paypal-secret" type="password" value={paypalSecret} onChange={e => setPaypalSecret(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payout Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="min-payout" className="text-sm font-medium">Minimum Payout Threshold</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                <Input id="min-payout" type="number" className="pl-7" value={minPayout} onChange={e => setMinPayout(Number(e.target.value))} />
              </div>
              <p className="text-xs text-gray-500">Minimum amount required before automatic payouts are processed</p>
            </div>
            <div className="space-y-2 pt-7">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="auto-payouts" className="h-4 w-4 rounded border-gray-300" checked={autoPayouts} onChange={e => setAutoPayouts(e.target.checked)} />
                <label htmlFor="auto-payouts" className="text-sm font-medium">Enable automatic payouts</label>
              </div>
              <p className="text-xs text-gray-500">When enabled, payouts will be processed automatically at the end of each month</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col items-end gap-2">
        <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Settings"}</Button>
        {saveSuccess && <span className="text-green-600 text-sm">Settings saved!</span>}
        {saveError && <span className="text-red-600 text-sm">{saveError}</span>}
      </div>
    </div>
  );
};

const AdminFinancePage = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Finance Management</h2>
        <p className="text-gray-500">Track revenue, manage plans, subscriptions and payouts</p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="promo-codes">Promo Codes</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <FinanceDashboardTab />
        </TabsContent>
        <TabsContent value="transactions">
          <TransactionsTab />
        </TabsContent>
        <TabsContent value="plans">
          <PlansTab />
        </TabsContent>
        <TabsContent value="subscriptions">
          <SubscriptionsTab />
        </TabsContent>
        <TabsContent value="promo-codes">
          <PromoCodesTab />
        </TabsContent>
        <TabsContent value="settings">
          <FinanceSettingsTab />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminFinancePage;
