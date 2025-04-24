
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

interface PayoutProps {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Processing" | "Pending";
  method: string;
  referrals: number;
}

const payouts: PayoutProps[] = [
  { id: "PAY-8742", date: "Apr 01, 2025", amount: "$240.00", status: "Paid", method: "PayPal", referrals: 5 },
  { id: "PAY-6531", date: "Mar 01, 2025", amount: "$176.00", status: "Paid", method: "PayPal", referrals: 4 },
  { id: "PAY-5243", date: "Feb 01, 2025", amount: "$112.00", status: "Paid", method: "PayPal", referrals: 3 },
  { id: "PAY-4128", date: "Jan 01, 2025", amount: "$96.00", status: "Paid", method: "PayPal", referrals: 2 },
  { id: "PAY-3097", date: "May 01, 2025", amount: "$168.00", status: "Pending", method: "PayPal", referrals: 4 },
];

const AffiliatePayoutsPage = () => {
  return (
    <AffiliateLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Payouts & Earnings</h2>
          <p className="text-muted-foreground">Manage your commission payouts and payment settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-[#1A237E] mr-2" />
                <span className="text-2xl font-bold">$792.00</span>
              </div>
              <p className="text-xs text-green-600 mt-1">+$168.00 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Next Payout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-[#00B8D4] mr-2" />
                <span className="text-2xl font-bold">May 1, 2025</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">$168.00 pending</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Lifetime Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">Tier 1: 14</p>
                <p className="text-xs text-gray-500">Tier 2: 4</p>
              </div>
            </CardContent>
          </Card>
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
                {payouts.map((payout) => (
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
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payout Settings</CardTitle>
            <CardDescription>Manage your payment preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Current Method</p>
                <p className="font-medium">PayPal (j****n@gmail.com)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Minimum Threshold</p>
                <p className="font-medium">$100.00</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Payment Schedule</p>
                <p className="font-medium">Monthly (1st of month)</p>
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
