
import React from "react";
import AffiliateLayout from "@/components/affiliate/AffiliateLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Download, 
  Calendar,
  DollarSign,
  CreditCard,
  ArrowDownUp,
} from "lucide-react";
import { useAffiliatePayouts } from "@/hooks/useAffiliatePayouts";
import { Skeleton } from "@/components/ui/skeleton";

const AffiliatePayoutsPage = () => {
  const { payoutsData, isLoading, error } = useAffiliatePayouts();

  if (error) {
    return (
      <AffiliateLayout>
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-red-500">Error loading payouts data</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </AffiliateLayout>
    );
  }
  
  return (
    <AffiliateLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Payouts & Earnings</h2>
          <p className="text-muted-foreground">Manage your commission payouts and payment settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isLoading ? (
            <>
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-[#1A237E] mr-2" />
                    <span className="text-2xl font-bold">${payoutsData?.totalEarned.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">+${payoutsData?.pendingAmount.toFixed(2)} this month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Next Payout</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-[#00B8D4] mr-2" />
                    <span className="text-2xl font-bold">{payoutsData?.nextPayoutDate}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">${payoutsData?.pendingAmount.toFixed(2)} pending</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Lifetime Referrals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{payoutsData?.lifetimeReferrals.total}</div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-500">Tier 1: {payoutsData?.lifetimeReferrals.tier1}</p>
                    <p className="text-xs text-gray-500">Tier 2: {payoutsData?.lifetimeReferrals.tier2}</p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Payout History</CardTitle>
                <CardDescription>View your commission payment history</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payout ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Referrals</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payoutsData?.payoutHistory.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell className="font-medium">{payout.id}</TableCell>
                      <TableCell>{payout.date}</TableCell>
                      <TableCell>{payout.amount}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payout.status === "Paid" ? "bg-green-100 text-green-800" : 
                          payout.status === "Processing" ? "bg-blue-100 text-blue-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {payout.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-1" /> {payout.method}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{payout.referrals}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payout Settings</CardTitle>
            <CardDescription>Manage your payment preferences</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
                <Skeleton className="h-10 w-48" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Current Method</p>
                    <p className="font-medium">{payoutsData?.paymentMethod} ({payoutsData?.paymentEmail})</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Minimum Threshold</p>
                    <p className="font-medium">${payoutsData?.minimumThreshold.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Payment Schedule</p>
                    <p className="font-medium">{payoutsData?.paymentSchedule}</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-3 mt-6">
                  <Button variant="outline" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Update Payment Method
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowDownUp className="h-4 w-4" />
                    Change Threshold
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Commission Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 p-4 bg-[#1A237E]/10 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Tier 1: 20%</h3>
                  <p className="text-sm text-gray-600">
                    You earn 20% commission on all subscriptions from your direct referrals. 
                    Example: If someone signs up for a $240 annual plan using your link, you earn $48.
                  </p>
                </div>
                <div className="flex-1 p-4 bg-[#00B8D4]/10 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Tier 2: 10%</h3>
                  <p className="text-sm text-gray-600">
                    You earn 10% commission when your referrals bring in new customers. 
                    Example: When your referral's referral signs up for a $240 plan, you earn $24.
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg mt-4">
                <h3 className="font-medium mb-1">Commission FAQ</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Commissions are calculated at the end of each month</li>
                  <li>• Minimum payout threshold is $100</li>
                  <li>• Commissions are paid for the lifetime of the customer</li>
                  <li>• Refunded purchases will have commissions reversed</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AffiliateLayout>
  );
};

export default AffiliatePayoutsPage;
