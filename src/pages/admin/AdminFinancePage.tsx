
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

// Sample data
const financeStats = {
  monthlyRevenue: 28490,
  activeSubscriptions: 2843,
  promoUsage: 186,
  totalPayouts: 12480
};

const transactionsData = [
  { id: "TXN-8294", user: "John Smith", email: "john@example.com", amount: 29.99, type: "Subscription", status: "Completed", gateway: "Stripe", createdAt: "2025-04-22" },
  { id: "TXN-8293", user: "Sarah Johnson", email: "sarah@example.com", amount: 99.99, type: "Subscription", status: "Completed", gateway: "PayPal", createdAt: "2025-04-21" },
  { id: "TXN-8292", user: "Michael Brown", email: "michael@example.com", amount: 149.99, type: "Upgrade", status: "Completed", gateway: "Stripe", createdAt: "2025-04-20" },
  { id: "TXN-8291", user: "Jennifer Lee", email: "jennifer@example.com", amount: 29.99, type: "Subscription", status: "Failed", gateway: "PayPal", createdAt: "2025-04-19" },
  { id: "TXN-8290", user: "David Wilson", email: "david@example.com", amount: 49.99, type: "Subscription", status: "Completed", gateway: "Stripe", createdAt: "2025-04-18" },
  { id: "TXN-8289", user: "Lisa Garcia", email: "lisa@example.com", amount: 20.00, type: "Credit", status: "Completed", gateway: "Manual", createdAt: "2025-04-17" },
  { id: "TXN-8288", user: "Robert Taylor", email: "robert@example.com", amount: 29.99, type: "Refund", status: "Completed", gateway: "Stripe", createdAt: "2025-04-16" }
];

const plansData = [
  { name: "Basic", price: "29.99", duration: "Monthly", description: "Essential features for small businesses", status: "Active", subscribers: 785 },
  { name: "Pro", price: "49.99", duration: "Monthly", description: "Advanced features for growing businesses", status: "Active", subscribers: 642 },
  { name: "Enterprise", price: "149.99", duration: "Monthly", description: "Complete solution for large organizations", status: "Active", subscribers: 391 },
  { name: "Basic Annual", price: "299.99", duration: "Yearly", description: "Essential features with annual discount", status: "Active", subscribers: 426 },
  { name: "Pro Annual", price: "499.99", duration: "Yearly", description: "Advanced features with annual discount", status: "Active", subscribers: 312 },
  { name: "Legacy", price: "19.99", duration: "Monthly", description: "Previous generation plan", status: "Inactive", subscribers: 287 }
];

const subscriptionsData = [
  { user: "John Smith", plan: "Pro", status: "Active", startDate: "2025-01-15", endDate: "2025-05-15", gateway: "Stripe", autoRenew: true },
  { user: "Sarah Johnson", plan: "Enterprise", status: "Active", startDate: "2024-11-22", endDate: "2025-11-22", gateway: "PayPal", autoRenew: true },
  { user: "Michael Brown", plan: "Basic Annual", status: "Active", startDate: "2024-12-03", endDate: "2025-12-03", gateway: "Stripe", autoRenew: true },
  { user: "Jennifer Lee", plan: "Basic", status: "Expired", startDate: "2025-01-10", endDate: "2025-04-10", gateway: "PayPal", autoRenew: false },
  { user: "David Wilson", plan: "Pro Annual", status: "Active", startDate: "2024-09-18", endDate: "2025-09-18", gateway: "Stripe", autoRenew: true },
  { user: "Lisa Garcia", plan: "Basic", status: "Canceled", startDate: "2025-02-05", endDate: "2025-05-05", gateway: "PayPal", autoRenew: false },
  { user: "Robert Taylor", plan: "Pro", status: "Trial", startDate: "2025-04-12", endDate: "2025-04-26", gateway: "Manual", autoRenew: false }
];

const promoCodesData = [
  { code: "WELCOME25", discount: 25, expiration: "2025-06-30", usageCount: 187, maxUses: 500, status: "Active" },
  { code: "SUMMER2025", discount: 20, expiration: "2025-08-31", usageCount: 42, maxUses: 200, status: "Active" },
  { code: "SPECIALOFFER", discount: 15, expiration: "2025-05-15", usageCount: 98, maxUses: 100, status: "Expired" },
  { code: "AFFILIATE10", discount: 10, expiration: null, usageCount: 265, maxUses: null, status: "Active" },
  { code: "BLACKFRIDAY", discount: 40, expiration: "2025-11-30", usageCount: 0, maxUses: 300, status: "Inactive" }
];

const FinanceDashboardTab = () => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 mr-3 text-green-600" />
            <div className="text-3xl font-bold">${financeStats.monthlyRevenue.toLocaleString()}</div>
          </div>
          <div className="mt-2 text-sm text-green-600">+8% from last month</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Active Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="w-8 h-8 mr-3 text-blue-600" />
            <div className="text-3xl font-bold">{financeStats.activeSubscriptions.toLocaleString()}</div>
          </div>
          <div className="mt-2 text-sm text-blue-600">+12 new today</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Promo Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Tag className="w-8 h-8 mr-3 text-purple-600" />
            <div className="text-3xl font-bold">{financeStats.promoUsage.toLocaleString()}</div>
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
            <div className="text-3xl font-bold">${financeStats.totalPayouts.toLocaleString()}</div>
          </div>
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
          <div className="text-center text-gray-500">
            <BarChart3 className="mx-auto h-16 w-16 opacity-50" />
            <p className="mt-2">Revenue trends chart will appear here</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Plan</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <BarChart3 className="mx-auto h-16 w-16 opacity-50" />
            <p className="mt-2">Plan distribution chart will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const TransactionsTab = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search transactions..."
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="all-types">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All Types</SelectItem>
              <SelectItem value="subscription">Subscription</SelectItem>
              <SelectItem value="upgrade">Upgrade</SelectItem>
              <SelectItem value="refund">Refund</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all-status">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
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
              {transactionsData.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{transaction.id}</td>
                  <td className="px-4 py-3 text-sm">{transaction.user}</td>
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
                  <td className="px-4 py-3 text-sm">{transaction.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const PlansTab = () => {
  return (
    <div>
      <div className="flex justify-end mb-6 gap-2">
        <Button variant="outline">
          <Star className="mr-2 h-4 w-4" />
          Set Default Plan
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
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
              {plansData.map((plan, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{plan.name}</td>
                  <td className="px-4 py-3 text-sm">${plan.price} / {plan.duration}</td>
                  <td className="px-4 py-3 text-sm">{plan.description}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      plan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{plan.subscribers}</td>
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
      </Card>
    </div>
  );
};

const SubscriptionsTab = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search subscriptions..."
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="all-plans">
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
          
          <Select defaultValue="all-status">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
            </SelectContent>
          </Select>
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
              {subscriptionsData.map((subscription, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{subscription.user}</td>
                  <td className="px-4 py-3 text-sm">{subscription.plan}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      subscription.status === 'Active' ? 'bg-green-100 text-green-800' :
                      subscription.status === 'Expired' ? 'bg-red-100 text-red-800' :
                      subscription.status === 'Canceled' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {subscription.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{subscription.startDate}</td>
                  <td className="px-4 py-3 text-sm">{subscription.endDate}</td>
                  <td className="px-4 py-3 text-sm">{subscription.gateway}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    {subscription.autoRenew ? (
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
      </Card>
    </div>
  );
};

const PromoCodesTab = () => {
  return (
    <div>
      <div className="flex justify-end mb-6">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Promo Code
        </Button>
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
              {promoCodesData.map((promo, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{promo.code}</td>
                  <td className="px-4 py-3 text-sm">{promo.discount}%</td>
                  <td className="px-4 py-3 text-sm">{promo.expiration || 'Never'}</td>
                  <td className="px-4 py-3 text-sm">{promo.usageCount}</td>
                  <td className="px-4 py-3 text-sm">{promo.maxUses || 'Unlimited'}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      promo.status === 'Active' ? 'bg-green-100 text-green-800' :
                      promo.status === 'Expired' ? 'bg-red-100 text-red-800' :
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
      </Card>
    </div>
  );
};

const FinanceSettingsTab = () => {
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
              <Select defaultValue="usd">
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
              <Select defaultValue="before">
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
                  <span className="text-sm text-green-600 font-medium mr-2">Connected</span>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="stripe-api-key" className="text-sm font-medium">API Key</label>
                  <Input id="stripe-api-key" type="password" value="pk_test_●●●●●●●●●●●●●●●●" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="stripe-secret-key" className="text-sm font-medium">Secret Key</label>
                  <Input id="stripe-secret-key" type="password" value="sk_test_●●●●●●●●●●●●●●●●" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">PayPal</h3>
                <div className="flex items-center">
                  <span className="text-sm text-green-600 font-medium mr-2">Connected</span>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="paypal-client-id" className="text-sm font-medium">Client ID</label>
                  <Input id="paypal-client-id" type="password" value="client_id_●●●●●●●●●●●●●●" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="paypal-secret" className="text-sm font-medium">Client Secret</label>
                  <Input id="paypal-secret" type="password" value="client_secret_●●●●●●●●●●●●" />
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
                <Input id="min-payout" type="number" className="pl-7" defaultValue="50" />
              </div>
              <p className="text-xs text-gray-500">Minimum amount required before automatic payouts are processed</p>
            </div>
            
            <div className="space-y-2 pt-7">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="auto-payouts" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                <label htmlFor="auto-payouts" className="text-sm font-medium">Enable automatic payouts</label>
              </div>
              <p className="text-xs text-gray-500">When enabled, payouts will be processed automatically at the end of each month</p>
            </div>
          </div>
        </CardContent>
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
