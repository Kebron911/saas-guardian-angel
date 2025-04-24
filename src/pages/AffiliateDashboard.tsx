
import React, { useState } from "react";
import { 
  ArrowRight, 
  Calendar,
  Copy, 
  DollarSign, 
  Download, 
  Link, 
  Mail, 
  QrCode,
  TrendingUp, 
  Twitter, 
  Users, 
  MessageSquare,
  HelpCircle
} from "lucide-react";
import AffiliateLayout from "@/components/affiliate/AffiliateLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from "recharts";
import { useToast } from "@/hooks/use-toast";

const AffiliateDashboard = () => {
  const { toast } = useToast();
  const [affiliateLink] = useState("https://ai-assistants.com/ref/john123");
  
  // Sample performance data
  const performanceData = [
    { month: 'Jan', clicks: 42, signups: 12, conversions: 8 },
    { month: 'Feb', clicks: 53, signups: 18, conversions: 11 },
    { month: 'Mar', clicks: 69, signups: 24, conversions: 15 },
    { month: 'Apr', clicks: 91, signups: 31, conversions: 22 },
    { month: 'May', clicks: 85, signups: 29, conversions: 19 },
    { month: 'Jun', clicks: 108, signups: 37, conversions: 26 },
  ];
  
  // Sample referral data
  const referralData = [
    { id: 1, user: "j****n@example.com", date: "2025-04-18", tier: 1, status: "Converted", commission: "$48.00" },
    { id: 2, user: "s****h@company.co", date: "2025-04-16", tier: 1, status: "Signed Up", commission: "$0.00" },
    { id: 3, user: "m****w@gmail.com", date: "2025-04-12", tier: 1, status: "Converted", commission: "$48.00" },
    { id: 4, user: "a****a@outlook.com", date: "2025-04-10", tier: 2, status: "Converted", commission: "$24.00" },
    { id: 5, user: "r****t@business.net", date: "2025-04-05", tier: 1, status: "Converted", commission: "$48.00" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink)
      .then(() => {
        toast({
          title: "Link Copied!",
          description: "Your affiliate link has been copied to clipboard."
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Copy failed",
          description: "Please try again or copy manually."
        });
      });
  };

  return (
    <AffiliateLayout>
      <div className="space-y-6">
        {/* Welcome Panel */}
        <Card className="bg-gradient-to-r from-[#1A237E]/10 to-[#00B8D4]/10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
                <p className="text-gray-600 mt-1">
                  Earn 20% for each referral + 10% from theirs. Start sharing today.
                </p>
              </div>
              <Badge className="mt-2 md:mt-0 bg-[#1A237E] text-white py-1.5 px-4 text-sm font-medium">
                Earn 20% Tier 1 | 10% Tier 2
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Referral Link & Share Tools */}
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>Share this unique link to start earning commissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <Input 
                  value={affiliateLink}
                  readOnly
                  className="flex-1 mr-2"
                />
                <Button onClick={copyToClipboard} className="flex items-center gap-1">
                  <Copy className="h-4 w-4" /> Copy
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-center items-center bg-gray-50 p-6 rounded-lg">
                  <QrCode className="w-24 h-24 text-[#1A237E]" />
                </div>
                
                <div className="flex flex-col space-y-3">
                  <p className="text-sm font-medium text-gray-700">Share your link via:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" /> WhatsApp
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Twitter className="h-4 w-4" /> Twitter
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email
                    </Button>
                  </div>
                  <Button className="mt-2 bg-[#1A237E] hover:bg-[#1A237E]/90">
                    Start Earning Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-[#00B8D4]/20 flex items-center justify-center mb-3">
                  <Link className="w-6 h-6 text-[#00B8D4]" />
                </div>
                <h3 className="font-medium">Share your link</h3>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-[#1A237E]/20 flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-[#1A237E]" />
                </div>
                <h3 className="font-medium">They sign up</h3>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-[#FF6F61]/20 flex items-center justify-center mb-3">
                  <DollarSign className="w-6 h-6 text-[#FF6F61]" />
                </div>
                <h3 className="font-medium">You get paid!</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Earnings Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-[#1A237E] mr-2" />
                <span className="text-2xl font-bold">$840.00</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending Payout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-[#00B8D4] mr-2" />
                <span className="text-2xl font-bold">$168.00</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Paid Commissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-[#FF6F61] mr-2" />
                <span className="text-2xl font-bold">$672.00</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Performance Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Stats</CardTitle>
            <CardDescription>Track your referral performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#1A237E" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="signups" 
                    stroke="#00B8D4" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="#FF6F61" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-500">Clicks</span>
                <span className="text-xl font-bold">448</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-500">Signups</span>
                <span className="text-xl font-bold">151</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-500">Conversion Rate</span>
                <span className="text-xl font-bold">22.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Affiliate Tier Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Affiliate Tier Breakdown</CardTitle>
            <CardDescription>Overview of your affiliate network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#1A237E]/20 flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-[#1A237E]" />
                    </div>
                    <span className="font-medium">Tier 1 Affiliates</span>
                  </div>
                  <span className="text-xl font-bold">14</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00B8D4]/20 flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-[#00B8D4]" />
                    </div>
                    <span className="font-medium">Tier 2 Affiliates</span>
                  </div>
                  <span className="text-xl font-bold">7</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Tier 1</h3>
                  <p className="text-sm text-gray-500">
                    Earn 20% from your direct referrals. When someone signs up using your link, you receive 20% of their subscription fee.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Tier 2</h3>
                  <p className="text-sm text-gray-500">
                    Earn 10% from referrals made by your referrals. When your referrals bring in new customers, you get 10% of those subscriptions too.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Referral Activity Table */}
        <Card>
          <CardHeader>
            <CardTitle>Referral Activity</CardTitle>
            <CardDescription>Recent referrals and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Commission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referralData.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell className="font-medium">{referral.user}</TableCell>
                    <TableCell>{referral.date}</TableCell>
                    <TableCell>Tier {referral.tier}</TableCell>
                    <TableCell>
                      <Badge variant={referral.status === "Converted" ? "default" : "secondary"}>
                        {referral.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{referral.commission}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="outline" className="mt-4 w-full">View All Referrals</Button>
          </CardContent>
        </Card>
        
        {/* Marketing Asset Library */}
        <Card>
          <CardHeader>
            <CardTitle>Marketing Asset Library</CardTitle>
            <CardDescription>Download ready-to-use promotional materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Button variant="outline" className="h-auto flex flex-col items-center py-4 px-2">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="text-sm">Banners</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center py-4 px-2">
                <Download className="h-6 w-6 mb-2" />
                <span className="text-sm">Logos</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center py-4 px-2">
                <Mail className="h-6 w-6 mb-2" />
                <span className="text-sm">Email Templates</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center py-4 px-2">
                <Mail className="h-6 w-6 mb-2" />
                <span className="text-sm">Videos</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center py-4 px-2">
                <Mail className="h-6 w-6 mb-2" />
                <span className="text-sm">Social Captions</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Payout Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Payout Settings</CardTitle>
            <CardDescription>Manage your commission payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Next Payout Date</p>
                <p className="font-medium">May 1, 2025</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Current Method</p>
                <p className="font-medium">PayPal (j****n@gmail.com)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Minimum Threshold</p>
                <p className="font-medium">$100.00</p>
              </div>
            </div>
            <Button variant="outline" className="mt-4">Edit Payment Info</Button>
          </CardContent>
        </Card>
        
        {/* Help & Support */}
        <Card>
          <CardHeader>
            <CardTitle>Help & Support</CardTitle>
            <CardDescription>Need assistance with the affiliate program?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="flex items-center justify-center gap-2 h-auto py-6">
                <HelpCircle className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Affiliate FAQ</p>
                  <p className="text-sm text-gray-500">Get answers to common questions</p>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2 h-auto py-6">
                <Mail className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Contact Affiliate Manager</p>
                  <p className="text-sm text-gray-500">Get personalized assistance</p>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AffiliateLayout>
  );
};

export default AffiliateDashboard;
