import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  DollarSign,
  Users,
  Tag,
  Search,
  Plus,
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
import { useFinanceDashboard } from "@/hooks/useFinanceDashboard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { RevenueTimelineChart } from "@/components/admin/finance/RevenueTimelineChart";
import { RevenuePlanChart } from "@/components/admin/finance/RevenuePlanChart";

const PromoCodeDialog = ({ onCreatePromoCode }: { onCreatePromoCode: (data: PromoCodeCreate) => void }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<PromoCodeCreate>({
    code: '',
    discount_percent: 0,
    expiration_date: '',
    max_uses: undefined,
    status: 'active'
  });

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
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Promo Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Promo Code</DialogTitle>
          <DialogDescription>
            Add a new promotional code to your system.
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
            <Button type="submit">Create Promo Code</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const FinanceDashboardTab = () => {
  const { stats, revenueTimeline, revenuePlanData, isLoading } = useFinanceDashboard();

  if (isLoading) {
    return <div className="flex justify-center my-12"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 mr-3 text-green-600" />
              <div className="text-3xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            </div>
            <div className="mt-2 text-sm text-gray-500">This month</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="w-8 h-8 mr-3 text-blue-600" />
              <div className="text-3xl font-bold">{stats.activeSubscriptions.toLocaleString()}</div>
            </div>
            <div className="mt-2 text-sm text-gray-500">Currently active</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Promo Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Tag className="w-8 h-8 mr-3 text-purple-600" />
              <div className="text-3xl font-bold">{stats.promoUsage.toLocaleString()}</div>
            </div>
            <div className="mt-2 text-sm text-gray-500">This month</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 mr-3 text-amber-600" />
              <div className="text-3xl font-bold">${stats.totalPayouts.toLocaleString()}</div>
            </div>
            <div className="mt-2 text-sm text-gray-500">Affiliate commissions</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueTimelineChart data={revenueTimeline} isLoading={isLoading} />
        <RevenuePlanChart data={revenuePlanData} isLoading={isLoading} />
      </div>
    </div>
  );
};

const PromoCodesTab = () => {
  const { promoCodes, fetchPromoCodes, createPromoCode, isLoading } = useAdminFinanceData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all-status");

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
          
          <PromoCodeDialog onCreatePromoCode={handleCreatePromoCode} />
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
                <th className="px-4 py-3 text-left text-sm font-semibold">Usage Count</th>
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
                  <td className="px-4 py-3 text-sm">
                    {promo.expiration_date ? new Date(promo.expiration_date).toLocaleDateString() : 'Never'}
                  </td>
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
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon">
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
          <TabsTrigger value="promo-codes">Promo Codes</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <FinanceDashboardTab />
        </TabsContent>
        <TabsContent value="promo-codes">
          <PromoCodesTab />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminFinancePage;
