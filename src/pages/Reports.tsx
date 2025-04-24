import React from "react";
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  Download, 
  Filter, 
  Plus,
  Search, 
  Users,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
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
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";

// Sample data for pie chart
const pieData = [
  { name: "Bookings", value: 38 },
  { name: "General Inquiries", value: 32 },
  { name: "Voicemail", value: 18 },
  { name: "Missed Calls", value: 12 }
];

const COLORS = ["#1A237E", "#00B8D4", "#7986CB", "#FF6F61"];

// Sample data for call volume by day
const callVolumeData = [
  { day: "Mon", calls: 24 },
  { day: "Tue", calls: 18 },
  { day: "Wed", calls: 22 },
  { day: "Thu", calls: 17 },
  { day: "Fri", calls: 20 },
  { day: "Sat", calls: 14 },
  { day: "Sun", calls: 13 }
];

// Sample data for top callers
const topCallersData = [
  { id: 1, name: "John Smith", number: "(555) 123-4567", totalCalls: 12, avgDuration: "3m 24s", lastCallDate: "Apr 20, 2025" },
  { id: 2, name: "Sarah Johnson", number: "(555) 987-6543", totalCalls: 8, avgDuration: "2m 58s", lastCallDate: "Apr 19, 2025" },
  { id: 3, name: "Michael Brown", number: "(555) 456-7890", totalCalls: 7, avgDuration: "4m 12s", lastCallDate: "Apr 18, 2025" },
  { id: 4, name: "Emily Davis", number: "(555) 234-5678", totalCalls: 5, avgDuration: "1m 45s", lastCallDate: "Apr 17, 2025" },
  { id: 5, name: "David Wilson", number: "(555) 345-6789", totalCalls: 4, avgDuration: "2m 32s", lastCallDate: "Apr 15, 2025" }
];

// Sample heatmap data (simplified representation)
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hoursOfDay = Array.from({ length: 12 }, (_, i) => i + 8); // 8am - 7pm

const generateHeatmapData = () => {
  const data = [];
  
  daysOfWeek.forEach(day => {
    hoursOfDay.forEach(hour => {
      data.push({
        day,
        hour: `${hour}:00`,
        value: Math.floor(Math.random() * 10)
      });
    });
  });
  
  return data;
};

const heatmapData = generateHeatmapData();

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Reports & Statistics</h2>
        <p className="text-gray-500 mt-1">Monitor your AI receptionist performance and call trends.</p>
      </div>
      
      {/* Date filter and search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 py-1 px-2 flex space-x-2">
          <button className="px-3 py-1.5 rounded-md bg-[#1A237E] text-white text-sm font-medium">
            This Month
          </button>
          <button className="px-3 py-1.5 rounded-md text-gray-600 text-sm font-medium hover:bg-gray-100">
            This Week
          </button>
          <button className="px-3 py-1.5 rounded-md text-gray-600 text-sm font-medium hover:bg-gray-100">
            <Calendar className="h-4 w-4 inline mr-1" />
            Custom
          </button>
        </div>
        
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search by name, number, or tag" 
            className="pl-9 w-full md:w-[280px]"
          />
        </div>
      </div>
      
      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Call Breakdown Pie Chart */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Call Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} calls`, 'Count']}
                    itemStyle={{ color: '#1A237E' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 flex-wrap mt-2">
              {pieData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-xs">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Assistant Performance Snapshot */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Assistant Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Average Response Time</p>
                    <p className="text-xl font-semibold">1.8s</p>
                  </div>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">12% faster</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Calls Handled Without Fallback</p>
                    <p className="text-xl font-semibold">94.2%</p>
                  </div>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">+3.5%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Bookings Handled Automatically</p>
                    <p className="text-xl font-semibold">86.5%</p>
                  </div>
                  <div className="flex items-center text-red-600">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">-1.2%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Customer Satisfaction Score</p>
                    <p className="text-xl font-semibold">4.8/5</p>
                  </div>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">+0.2</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Call Volume Heatmap */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Call Volume Heatmap</CardTitle>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <span className="block w-3 h-3 rounded-full bg-green-200 mr-1"></span>
                  <span className="text-xs text-gray-500">Low</span>
                </div>
                <div className="flex items-center">
                  <span className="block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                  <span className="text-xs text-gray-500">Medium</span>
                </div>
                <div className="flex items-center">
                  <span className="block w-3 h-3 rounded-full bg-green-700 mr-1"></span>
                  <span className="text-xs text-gray-500">High</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-center mb-2">Hour of Day (8AM - 7PM)</div>
            <div className="grid grid-cols-12 gap-1">
              {/* Hours header */}
              {hoursOfDay.map((hour) => (
                <div key={hour} className="h-6 flex items-center justify-center text-xs text-gray-500">
                  {hour}
                </div>
              ))}
              
              {/* Day rows */}
              {daysOfWeek.map((day) => (
                <React.Fragment key={day}>
                  <div className="col-span-12 text-left text-xs text-gray-500 mt-1">{day}</div>
                  {hoursOfDay.map((hour) => {
                    const cellData = heatmapData.find(d => d.day === day && d.hour === `${hour}:00`);
                    const value = cellData ? cellData.value : 0;
                    let bgColor = 'bg-green-100';
                    if (value > 6) bgColor = 'bg-green-700';
                    else if (value > 3) bgColor = 'bg-green-500';
                    else if (value > 0) bgColor = 'bg-green-200';
                    
                    return (
                      <div 
                        key={`${day}-${hour}`} 
                        className={`h-6 ${bgColor} rounded-sm flex items-center justify-center`} 
                        title={`${day}, ${hour}:00 - ${value} calls`}
                      >
                        <span className="text-xs text-white font-medium">{value > 0 ? value : ''}</span>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Tuesday, 2PM is your busiest time with an average of 9 calls
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Call Trend Graph */}
      <Card className="shadow-sm mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Call Trend</CardTitle>
            <div className="bg-gray-100 rounded-md flex text-sm">
              <button className="px-3 py-1 rounded-md bg-[#1A237E] text-white">Calls</button>
              <button className="px-3 py-1 rounded-md text-gray-600">Bookings</button>
              <button className="px-3 py-1 rounded-md text-gray-600">Voicemails</button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={callVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="calls" 
                  stroke="#1A237E" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Top Callers List */}
      <Card className="shadow-sm mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Top Callers</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name / Number</TableHead>
                  <TableHead className="text-right">Total Calls</TableHead>
                  <TableHead className="text-right">Avg. Duration</TableHead>
                  <TableHead className="text-right">Last Call</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCallersData.map((caller) => (
                  <TableRow key={caller.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{caller.name}</p>
                        <p className="text-xs text-gray-500">{caller.number}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{caller.totalCalls}</TableCell>
                    <TableCell className="text-right">{caller.avgDuration}</TableCell>
                    <TableCell className="text-right">{caller.lastCallDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Add to contacts</span>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">View call log</span>
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Download Reports */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Download Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-2">Call Details Report</h4>
              <p className="text-sm text-gray-500 mb-4">Complete log of all calls with duration, outcome, and timestamps.</p>
              <Button className="bg-[#1A237E] hover:bg-[#0E1358] w-full">
                <Download className="h-4 w-4 mr-2" />
                Download as CSV
              </Button>
            </div>
            
            <div className="flex-1 p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-2">Performance Summary</h4>
              <p className="text-sm text-gray-500 mb-4">AI assistant metrics, handling rates, and comparison to previous periods.</p>
              <Button className="bg-[#1A237E] hover:bg-[#0E1358] w-full">
                <Download className="h-4 w-4 mr-2" />
                Download as PDF
              </Button>
            </div>
            
            <div className="flex-1 p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-2">Custom Report</h4>
              <p className="text-sm text-gray-500 mb-4">Build a customized report with the exact metrics you need.</p>
              <Button className="bg-[#1A237E] hover:bg-[#0E1358] w-full">
                <Download className="h-4 w-4 mr-2" />
                Create Custom Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <p className="text-xs text-gray-500 mt-6 text-right">Updated 5 minutes ago</p>
    </DashboardLayout>
  );
};

export default Reports;
