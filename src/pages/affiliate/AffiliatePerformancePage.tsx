
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
import { useAffiliatePerformance } from "@/hooks/useAffiliatePerformance";
import { Skeleton } from "@/components/ui/skeleton";

const AffiliatePerformancePage = () => {
  const { performanceData, isLoading, error } = useAffiliatePerformance();
  
  if (error) {
    return (
      <AffiliateLayout>
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-red-500">Error loading performance data</h2>
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
          {isLoading ? (
            <>
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{performanceData?.totalClicks.toLocaleString()}</div>
                  <p className="text-xs text-green-600">+{performanceData?.monthlyChange.clicks}% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Sign-Ups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{performanceData?.totalSignups.toLocaleString()}</div>
                  <p className="text-xs text-green-600">+{performanceData?.monthlyChange.signups}% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Conversions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{performanceData?.totalConversions.toLocaleString()}</div>
                  <p className="text-xs text-green-600">+{performanceData?.monthlyChange.conversions}% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{performanceData?.conversionRate}%</div>
                  <p className="text-xs text-green-600">+{performanceData?.monthlyChange.rate}% from last month</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Traffic, sign-ups, and conversion data over time</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[350px]">
                <Skeleton className="w-full h-full" />
              </div>
            ) : (
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={performanceData?.performanceTrend}
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
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-2.5 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-2.5 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-2.5 w-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  {performanceData?.trafficSources.map((source, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center">
                        <span>{source.source}</span>
                        <span className="font-medium">{source.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 mt-1">
                        <div 
                          className={`${
                            index === 0 ? 'bg-[#1A237E]' : 
                            index === 1 ? 'bg-[#00B8D4]' : 
                            index === 2 ? 'bg-[#FF6F61]' : 'bg-gray-500'
                          } h-2.5 rounded-full`} 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Conversion by Plan</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-2.5 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-2.5 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-2.5 w-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  {performanceData?.conversionsByPlan.map((plan, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center">
                        <span>{plan.plan}</span>
                        <span className="font-medium">{plan.conversions} conversions</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 mt-1">
                        <div 
                          className={`${
                            index === 0 ? 'bg-[#1A237E]' : 
                            index === 1 ? 'bg-[#00B8D4]' : 
                            'bg-[#FF6F61]'
                          } h-2.5 rounded-full`} 
                          style={{ width: `${plan.totalPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AffiliateLayout>
  );
};

export default AffiliatePerformancePage;
