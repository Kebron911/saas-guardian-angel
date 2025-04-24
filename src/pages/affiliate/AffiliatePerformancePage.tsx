
import React from "react";
import AffiliateLayout from "@/components/affiliate/AffiliateLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";

const performanceData = [
  { month: 'Jan', clicks: 120, signups: 28, conversions: 15 },
  { month: 'Feb', clicks: 160, signups: 42, conversions: 22 },
  { month: 'Mar', clicks: 180, signups: 38, conversions: 18 },
  { month: 'Apr', clicks: 220, signups: 52, conversions: 25 },
  { month: 'May', clicks: 290, signups: 78, conversions: 42 },
  { month: 'Jun', clicks: 340, signups: 96, conversions: 58 },
];

const AffiliatePerformancePage = () => {
  return (
    <AffiliateLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Performance Analytics</h2>
            <p className="text-muted-foreground">Track your affiliate performance over time</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Last 30 Days
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,310</div>
              <p className="text-xs text-green-600">+12.5% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Sign-Ups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">334</div>
              <p className="text-xs text-green-600">+23.1% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">180</div>
              <p className="text-xs text-green-600">+17.8% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">13.7%</div>
              <p className="text-xs text-green-600">+2.1% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Traffic, sign-ups, and conversion data over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={performanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="clicks" stroke="#1A237E" strokeWidth={2} />
                  <Line type="monotone" dataKey="signups" stroke="#00B8D4" strokeWidth={2} />
                  <Line type="monotone" dataKey="conversions" stroke="#FF6F61" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Social Media</span>
                  <span className="font-medium">42%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-[#1A237E] h-2.5 rounded-full" style={{ width: '42%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Direct Link</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-[#00B8D4] h-2.5 rounded-full" style={{ width: '28%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Email</span>
                  <span className="font-medium">18%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-[#FF6F61] h-2.5 rounded-full" style={{ width: '18%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Blog Posts</span>
                  <span className="font-medium">12%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Conversion by Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Professional Plan</span>
                  <span className="font-medium">56 conversions</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-[#1A237E] h-2.5 rounded-full" style={{ width: '56%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Business Plan</span>
                  <span className="font-medium">32 conversions</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-[#00B8D4] h-2.5 rounded-full" style={{ width: '32%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Enterprise Plan</span>
                  <span className="font-medium">12 conversions</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-[#FF6F61] h-2.5 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AffiliateLayout>
  );
};

export default AffiliatePerformancePage;
