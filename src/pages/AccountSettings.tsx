
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  CreditCard, 
  Check,
  Download,
  Plus,
  LogIn,
  Shield,
  Mail,
  Smartphone,
  Globe,
  AlertCircle
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample data for billing history
const billingHistory = [
  { id: 1, date: "Apr 12, 2025", description: "Monthly Subscription - Pro Plan", amount: "$89.00", status: "Paid", invoice: "INV-2025-0412" },
  { id: 2, date: "Mar 12, 2025", description: "Monthly Subscription - Pro Plan", amount: "$89.00", status: "Paid", invoice: "INV-2025-0312" },
  { id: 3, date: "Feb 12, 2025", description: "Monthly Subscription - Pro Plan", amount: "$89.00", status: "Paid", invoice: "INV-2025-0212" },
  { id: 4, date: "Jan 12, 2025", description: "Monthly Subscription - Pro Plan", amount: "$89.00", status: "Paid", invoice: "INV-2025-0112" },
  { id: 5, date: "Dec 12, 2024", description: "Monthly Subscription - Starter Plan", amount: "$49.00", status: "Paid", invoice: "INV-2024-1212" },
];

// Sample data for login history
const loginHistory = [
  { id: 1, date: "Apr 20, 2025", time: "10:24 AM", ip: "192.168.1.1", location: "New York, USA", device: "Chrome on Windows" },
  { id: 2, date: "Apr 18, 2025", time: "3:12 PM", ip: "192.168.1.1", location: "New York, USA", device: "Chrome on Windows" },
  { id: 3, date: "Apr 15, 2025", time: "9:45 AM", ip: "192.168.1.1", location: "New York, USA", device: "Mobile App on iPhone" },
  { id: 4, date: "Apr 10, 2025", time: "11:30 AM", ip: "192.168.1.1", location: "New York, USA", device: "Chrome on Windows" },
];

const AccountSettings = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Account & Settings</h2>
        <p className="text-gray-500 mt-1">Manage your account details, subscription, billing, and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Business Profile</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input id="business-name" defaultValue="Premier Dental" className="mt-1" />
                    </div>
                    
                    <div>
                      <Label htmlFor="business-phone">Business Phone Number</Label>
                      <Input id="business-phone" defaultValue="(555) 123-4567" className="mt-1" />
                    </div>
                    
                    <div>
                      <Label htmlFor="business-email">Business Email</Label>
                      <Input id="business-email" type="email" defaultValue="contact@premierdental.com" className="mt-1" />
                    </div>
                    
                    <div>
                      <Label htmlFor="contact-name">Contact Person Name</Label>
                      <Input id="contact-name" defaultValue="John Doe" className="mt-1" />
                    </div>
                    
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <select id="timezone" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1">
                        <option value="et">Eastern Time (ET)</option>
                        <option value="ct">Central Time (CT)</option>
                        <option value="mt">Mountain Time (MT)</option>
                        <option value="pt">Pacific Time (PT)</option>
                      </select>
                      <p className="text-sm text-gray-500 mt-1">Used for scheduling and reports</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-2">Business Address (Optional)</Label>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address-line1">Street Address</Label>
                      <Input id="address-line1" defaultValue="123 Main Street" className="mt-1" />
                    </div>
                    
                    <div>
                      <Label htmlFor="address-line2">Suite/Unit (Optional)</Label>
                      <Input id="address-line2" defaultValue="Suite 500" className="mt-1" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="New York" className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" defaultValue="NY" className="mt-1" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zip">Zip Code</Label>
                        <Input id="zip" defaultValue="10001" className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <select id="country" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1">
                          <option value="us">United States</option>
                          <option value="ca">Canada</option>
                          <option value="uk">United Kingdom</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="pt-3">
                      <p className="text-sm text-gray-500">This address will be used for billing and invoices only.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center mb-3">
                    <div className="rounded-full bg-gray-200 p-2">
                      <Globe className="w-5 h-5 text-gray-700" />
                    </div>
                    <h4 className="font-medium ml-3">Business Website</h4>
                  </div>
                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <Label htmlFor="website-url">Website URL</Label>
                      <Input id="website-url" defaultValue="https://premierdental.com" className="mt-1" />
                    </div>
                    <Button>Verify</Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Verifying your website helps your AI assistant answer questions about your business more accurately.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-[#1A237E] hover:bg-[#0E1358]">Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Subscription Tab */}
        <TabsContent value="subscription">
          <Card className="shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Current Plan</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="bg-white border-2 border-[#1A237E] rounded-lg p-6 flex-1 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#1A237E] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Current Plan
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#1A237E]">Pro Plan</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold">$89</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>Unlimited AI calls</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>3 phone numbers</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>Calendar integrations</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>Advanced call routing</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>Premium support</span>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline">Downgrade Plan</Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 flex-1">
                  <h3 className="text-xl font-bold mb-2">Enterprise Plan</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold">$249</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>Everything in Pro, plus:</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>Unlimited phone numbers</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>Custom AI training</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>Priority support</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>White-labeled service</span>
                    </div>
                  </div>
                  <Button className="bg-[#1A237E] hover:bg-[#0E1358]">Upgrade Plan</Button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-gray-700 mr-2" />
                    <h4 className="font-medium">Billing Information</h4>
                  </div>
                  <Button variant="outline" size="sm">Update Payment Method</Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Current Payment Method</p>
                    <div className="flex items-center mt-1">
                      <div className="bg-white rounded-md border border-gray-200 p-2 mr-3">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" rx="4" fill="#1A1F71"/>
                          <path d="M9.5 15H7.5L9 9H11L9.5 15Z" fill="white"/>
                          <path d="M17.5 9.2C17.1 9.05 16.5 9 15.9 9C14.3 9 13 10 13 11.5C13 12.7 14 13.2 14.8 13.5C15.5 13.8 15.8 14 15.8 14.3C15.8 14.8 15.2 15 14.7 15C14 15 13.5 14.9 12.8 14.6L12.6 14.5L12.3 16.1C12.7 16.3 13.5 16.5 14.3 16.5C16 16.5 17.3 15.5 17.3 13.9C17.3 13 16.8 12.3 15.8 11.9C15.2 11.6 14.8 11.4 14.8 11.1C14.8 10.8 15.1 10.5 15.8 10.5C16.3 10.5 16.8 10.6 17.1 10.8L17.3 10.9L17.5 9.2Z" fill="white"/>
                          <path d="M18.7 9H17.4C17 9 16.7 9.1 16.5 9.6L14 15H15.8C15.8 15 16 14.6 16.1 14.4C16.2 14.4 17.7 14.4 18 14.4C18 14.6 18.1 15 18.1 15H19.7L18.7 9ZM16.5 13C16.7 12.5 17.2 11.1 17.2 11.1C17.2 11.1 17.3 10.8 17.4 10.6L17.5 11C17.5 11 17.8 12.5 17.9 13H16.5Z" fill="white"/>
                          <path d="M6.3 9L4.6 13.2L4.4 12.2C4 11 3 10 3 10H4.8L7.1 14.9V9H6.3Z" fill="white"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 1234</p>
                        <p className="text-xs text-gray-500">Expires 12/2028</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Next Billing Date</p>
                    <p className="font-medium mt-1">May 12, 2025</p>
                    <p className="text-xs text-gray-500">Your plan will automatically renew on this date</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Usage & Limits</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Phone Numbers</Label>
                    <span className="text-sm font-medium">1 of 3 used</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00B8D4] w-1/3 rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Training Data Storage</Label>
                    <span className="text-sm font-medium">24MB of 1GB used</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00B8D4] w-[3%] rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Call Recording Storage</Label>
                    <span className="text-sm font-medium">124MB of 10GB used</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00B8D4] w-[12%] rounded-full"></div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline">Purchase Additional Storage</Button>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium mb-4">Cancel Subscription</h4>
                <p className="text-sm text-gray-600 mb-4">
                  If you cancel your subscription, you will lose access to all Professional AI Assistant features at the end of your billing period.
                </p>
                <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Billing History Tab */}
        <TabsContent value="billing">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Billing History</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Invoice</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">{item.amount}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Invoice Settings</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="billing-email" className="mb-2 block">Billing Email</Label>
                    <Input id="billing-email" defaultValue="billing@premierdental.com" className="mb-1" />
                    <p className="text-xs text-gray-500">Separate from contact email. Invoices will be sent here.</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="tax-id" className="mb-2 block">Company Tax ID (Optional)</Label>
                    <Input id="tax-id" placeholder="e.g., 12-3456789" className="mb-1" />
                    <p className="text-xs text-gray-500">For business receipts and tax purposes</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">All charges in USD. For questions, contact support.</p>
                    <Button variant="outline" size="sm">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">App Integrations</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-500 mb-6">Connect your AI assistant with these tools to enhance functionality.</p>
              
              <div className="space-y-4">
                {/* Calendar Integration */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex">
                      <div className="rounded-lg bg-blue-100 p-3">
                        <svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                          <path fill="#4285f4" d="m37.7 24.2-2.8-2.3-10.3 8.4-2.5-2.9-2.6 2.1 5 5.9z"/>
                          <path fill="#34a853" d="M26 33.3 13.5 43.5c-.8.7-2 .7-2.8 0L2 35.6V11.4l12.5 12.9L26 33.3z"/>
                          <path fill="#fbbc04" d="M46 11.4v24.2l-8.3 7.9-12.5-11.7-1.4-1.4 10.2-8.4L46 11.4z"/>
                          <path fill="#ea4335" d="M46 11.4v24.2l-8.3 7.9-12.5-11.7-1.4-1.4 10.2-8.4L46 11.4z"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Google Calendar</h4>
                        <p className="text-sm text-gray-500">Let your AI assistant book appointments directly in your calendar.</p>
                      </div>
                    </div>
                    <Button className="bg-green-100 text-green-800 hover:bg-green-200" size="sm">Connected</Button>
                  </div>
                  <div className="bg-gray-50 rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">premierdental@gmail.com</p>
                        <p className="text-xs text-gray-500">Primary Calendar • Auto-sync enabled</p>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
                
                {/* CRM Integration */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex">
                      <div className="rounded-lg bg-blue-100 p-3">
                        <svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                          <path fill="#FF7A59" d="M24,43l-3.4,1.8c-1.6,0.9-3.6-0.2-3.6-2V14.7c0-1.2,0.6-2.2,1.6-2.8L24,8l5.4,3.9c1,0.6,1.6,1.6,1.6,2.8v28.1
                          c0,1.8-2,2.9-3.6,2V43z"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">HubSpot</h4>
                        <p className="text-sm text-gray-500">Automatically create contacts and log call activity in your CRM.</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
                
                {/* Slack Integration */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex">
                      <div className="rounded-lg bg-purple-100 p-3">
                        <svg className="w-6 h-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                          <path fill="#33d375" d="M8.421,26.254H4.165c-2.275,0-4.165,1.89-4.165,4.165v13.416c0,2.275,1.89,4.165,4.165,4.165h4.256
                          c2.275,0,4.165-1.89,4.165-4.165V30.419C12.586,28.144,10.696,26.254,8.421,26.254z"/>
                          <path fill="#33d375" d="M43.835,26.254h-4.256c-2.275,0-4.165,1.89-4.165,4.165v13.416c0,2.275,1.89,4.165,4.165,4.165h4.256
                          c2.275,0,4.165-1.89,4.165-4.165V30.419C48,28.144,46.11,26.254,43.835,26.254z"/>
                          <path fill="#40b4e5" d="M26.254,8.421V4.165C26.254,1.89,24.364,0,22.089,0H8.673c-2.275,0-4.165,1.89-4.165,4.165v4.256
                          c0,2.275,1.89,4.165,4.165,4.165h13.416C24.364,12.586,26.254,10.696,26.254,8.421z"/>
                          <path fill="#40b4e5" d="M26.254,43.835v-4.256c0-2.275-1.89-4.165-4.165-4.165H8.673c-2.275,0-4.165,1.89-4.165,4.165v4.256
                          C4.508,46.11,6.398,48,8.673,48h13.416C24.364,48,26.254,46.11,26.254,43.835z"/>
                          <path fill="#cf4550" d="M43.835,4.508h-4.256c-2.275,0-4.165,1.89-4.165,4.165v13.416c0,2.275,1.89,4.165,4.165,4.165h4.256
                          c2.275,0,4.165-1.89,4.165-4.165V8.673C48,6.398,46.11,4.508,43.835,4.508z"/>
                          <path fill="#f7be3a" d="M21.746,21.746H8.33c-2.275,0-4.165,1.89-4.165,4.165v13.416c0,2.275,1.89,4.165,4.165,4.165h13.416
                          c2.275,0,4.165-1.89,4.165-4.165V25.911C25.911,23.636,24.021,21.746,21.746,21.746z"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Slack</h4>
                        <p className="text-sm text-gray-500">Receive real-time notifications about calls and bookings.</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
                
                {/* Zapier Integration */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex">
                      <div className="rounded-lg bg-orange-100 p-3">
                        <svg className="w-6 h-6 text-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                          <path fill="#FF4A00" d="M42.8,24c0,10.4-8.4,18.8-18.8,18.8S5.2,34.4,5.2,24S13.6,5.2,24,5.2S42.8,13.6,42.8,24z"/>
                          <path fill="#FFF" d="M29.6,17.8l-7.7,5.5c-0.2,0.1-0.2,0.4-0.1,0.6l5.5,7.7c0.4,0.5,0.6,0.5,0.6,0.5s0.2,0,0.6-0.5l5.5-7.7
                          c0.1-0.2,0.1-0.4-0.1-0.6l-7.7-5.5C29.9,17.7,29.8,17.7,29.6,17.8z M18.2,14.4l0.5,0.3c0.2,0.1,0.4,0.1,0.6-0.1l1.8-2.5
                          c0.3-0.5,0.2-0.7,0.2-0.7c0,0-0.2-0.1-0.7,0.2l-2.5,1.8c-0.2,0.1-0.2,0.4-0.1,0.6L18.2,14.4z M15.4,20.2l0.5,0.3c0.2,0.1,0.4,0.1,0.6-0.1
                          l3.6-5c0.3-0.5,0.2-0.7,0.2-0.7c0,0-0.2-0.1-0.7,0.2l-5,3.6c-0.2,0.1-0.2,0.4-0.1,0.6L15.4,20.2z M25,32.2l-0.5-0.3
                          c-0.2-0.1-0.4-0.1-0.6,0.1l-3.6,5c-0.3,0.5-0.2,0.7-0.2,0.7c0,0,0.2,0.1,0.7-0.2l5-3.6c0.2-0.1,0.2-0.4,0.1-0.6L25,32.2z M26.9,35
                          l-0.5-0.3c-0.2-0.1-0.4-0.1-0.6,0.1l-1.8,2.5c-0.3,0.5-0.2,0.7-0.2,0.7c0,0,0.2,0.1,0.7-0.2l2.5-1.8c0.2-0.1,0.2-0.4,0.1-0.6L26.9,35z
                          M32.6,26.2l-0.5-0.3c-0.2-0.1-0.4-0.1-0.6,0.1L27.9,31c-0.3,0.5-0.2,0.7-0.2,0.7c0,0,0.2,0.1,0.7-0.2l5-3.6c0.2-0.1,0.2-0.4,0.1-0.6
                          L32.6,26.2z M13.9,24.5l0.5,0.3c0.2,0.1,0.4,0.1,0.6-0.1l5.5-7.7c0.4-0.5,0.2-0.7,0.2-0.7c0,0-0.2-0.1-0.7,0.2l-7.7,5.5
                          c-0.2,0.1-0.2,0.4-0.1,0.6L13.9,24.5z"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Zapier</h4>
                        <p className="text-sm text-gray-500">Connect to 3000+ apps to create custom automations.</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button variant="outline" className="text-sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Suggest an Integration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Security & Login</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-4">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" className="mt-1" />
                    </div>
                    <Button className="bg-[#1A237E] hover:bg-[#0E1358] mt-2">
                      Update Password
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Two-Factor Authentication (2FA)</h4>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-green-600 mr-2" />
                        <p className="font-medium">Two-factor authentication is enabled</p>
                      </div>
                      <Button variant="ghost" size="sm">Disable</Button>
                    </div>
                    <p className="text-sm text-gray-500">Your account is protected with app-based authentication.</p>
                  </div>
                  
                  <h4 className="font-medium mb-2">Change 2FA Method</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="auth-app" name="auth-method" className="rounded-full" checked />
                      <Label htmlFor="auth-app" className="cursor-pointer">Authentication App</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="sms" name="auth-method" className="rounded-full" />
                      <Label htmlFor="sms" className="cursor-pointer">SMS Text Message</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="email" name="auth-method" className="rounded-full" />
                      <Label htmlFor="email" className="cursor-pointer">Email</Label>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="mt-4" size="sm">
                    <Mail className="w-4 h-4 mr-1" />
                    Change Recovery Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Login Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Device</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.date}</p>
                            <p className="text-xs text-gray-500">{item.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>{item.ip}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {item.device.includes('Mobile') ? (
                              <Smartphone className="w-4 h-4 mr-1 text-gray-500" />
                            ) : (
                              <LogIn className="w-4 h-4 mr-1 text-gray-500" />
                            )}
                            <span>{item.device}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                  Logout of All Devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Account Preferences</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Language & Region</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="language" className="mb-2 block">Language</Label>
                      <select id="language" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                        <option value="en-US">English (US)</option>
                        <option value="en-GB">English (UK)</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="date-format" className="mb-2 block">Date Format</Label>
                      <select id="date-format" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                        <option value="mdy">MM/DD/YYYY</option>
                        <option value="dmy">DD/MM/YYYY</option>
                        <option value="ymd">YYYY/MM/DD</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive emails about calls and activities</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Call Summaries</p>
                        <p className="text-sm text-gray-500">Daily digest of call activity</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Billing Alerts</p>
                        <p className="text-sm text-gray-500">Receive alerts about billing and subscription</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Product Updates</p>
                        <p className="text-sm text-gray-500">Learn about new features and improvements</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Appearance</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start border-2 border-[#1A237E]">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="#1A237E"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V3C11 2.44772 11.4477 2 12 2Z" fill="#1A237E"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 18C12.5523 18 13 18.4477 13 19V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V19C11 18.4477 11.4477 18 12 18Z" fill="#1A237E"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M5 12C5 11.4477 5.44772 11 6 11H8C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13H6C5.44772 13 5 12.5523 5 12Z" fill="#1A237E"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M15 12C15 11.4477 15.4477 11 16 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H16C15.4477 13 15 12.5523 15 12Z" fill="#1A237E"/>
                      </svg>
                      Light Mode
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.4863 3.51192C7.16986 3.97649 3.75 7.65586 3.75 12.1667C3.75 17.0347 7.63225 21 12.5 21C16.5305 21 19.9129 18.3741 20.8316 14.7286C20.9089 14.4142 20.694 14.1223 20.3743 14.1157C20.2855 14.1138 20.1932 14.1147 20.098 14.1182C19.7703 14.1323 19.4401 14.1667 19.1111 14.1667C16.0261 14.1667 13.3455 12.7431 11.714 10.5461C10.4496 8.83639 9.72222 6.71356 9.72222 4.41667C9.72222 4.27258 9.72448 4.12937 9.72893 3.98709C9.74304 3.54389 9.25221 3.3208 8.87534 3.56593C8.76191 3.64128 8.65075 3.72025 8.54193 3.80273C7.83794 4.35481 7.225 5.01325 6.7266 5.75218C5.70416 7.23845 5.11111 9.04671 5.11111 11C5.11111 16.2467 9.20139 20.5 14.2778 20.5C16.2853 20.5 18.1544 19.8471 19.6485 18.7482C19.8825 18.5754 19.8453 18.2023 19.5669 18.1076C19.1424 17.9631 18.736 17.7752 18.3522 17.5488C17.2024 16.8961 16.2521 15.9218 15.6261 14.7458C15.0001 13.5698 14.7243 12.2404 14.8323 10.9131C14.9404 9.5858 15.428 8.31358 16.2392 7.26282C17.0504 6.21207 18.1528 5.42648 19.4093 5.00952C19.6974 4.9195 19.7529 4.55193 19.502 4.38748C17.2416 3.00516 14.4391 2.986 11.4863 3.51192ZM15.5 7.75C15.9142 7.75 16.25 7.41421 16.25 7C16.25 6.58579 15.9142 6.25 15.5 6.25C15.0858 6.25 14.75 6.58579 14.75 7C14.75 7.41421 15.0858 7.75 15.5 7.75ZM18 9.75C18.4142 9.75 18.75 9.41421 18.75 9C18.75 8.58579 18.4142 8.25 18 8.25C17.5858 8.25 17.25 8.58579 17.25 9C17.25 9.41421 17.5858 9.75 18 9.75ZM15.5 12.75C15.9142 12.75 16.25 12.4142 16.25 12C16.25 11.5858 15.9142 11.25 15.5 11.25C15.0858 11.25 14.75 11.5858 14.75 12C14.75 12.4142 15.0858 12.75 15.5 12.75Z" fill="#333"/>
                      </svg>
                      Dark Mode
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V3C11 2.44772 11.4477 2 12 2Z" fill="#333"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 18C12.5523 18 13 18.4477 13 19V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V19C11 18.4477 11.4477 18 12 18Z" fill="#333"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M5 12C5 11.4477 5.44772 11 6 11H8C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13H6C5.44772 13 5 12.5523 5 12Z" fill="#333"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M15 12C15 11.4477 15.4477 11 16 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H16C15.4477 13 15 12.5523 15 12Z" fill="#333"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.70711 6.70711C7.09763 6.31658 7.7308 6.31658 8.12132 6.70711L9.41421 8C9.80474 8.39052 9.80474 9.02369 9.41421 9.41421C9.02369 9.80474 8.39052 9.80474 8 9.41421L6.70711 8.12132C6.31658 7.7308 6.31658 7.09763 6.70711 6.70711Z" fill="#333"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.5858 14.5858C14.9763 14.1953 15.6095 14.1953 16 14.5858L17.2929 15.8787C17.6834 16.2692 17.6834 16.9024 17.2929 17.2929C16.9024 17.6834 16.2692 17.6834 15.8787 17.2929L14.5858 16C14.1953 15.6095 14.1953 14.9763 14.5858 14.5858Z" fill="#333"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.2929 6.70711C17.6834 7.09763 17.6834 7.7308 17.2929 8.12132L16 9.41421C15.6095 9.80474 14.9763 9.80474 14.5858 9.41421C14.1953 9.02369 14.1953 8.39052 14.5858 8L15.8787 6.70711C16.2692 6.31658 16.9024 6.31658 17.2929 6.70711Z" fill="#333"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.41421 14.5858C9.80474 14.9763 9.80474 15.6095 9.41421 16L8.12132 17.2929C7.7308 17.6834 7.09763 17.6834 6.70711 17.2929C6.31658 16.9024 6.31658 16.2692 6.70711 15.8787L8 14.5858C8.39052 14.1953 9.02369 14.1953 9.41421 14.5858Z" fill="#333"/>
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="#333"/>
                      </svg>
                      System Default
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Default Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Default Assistant Persona</p>
                        <p className="text-sm text-gray-500">When creating new assistants</p>
                      </div>
                      <select className="w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none">
                        <option value="maya">Maya</option>
                        <option value="sally">Sally</option>
                        <option value="steve">Steve</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Dashboard Time Range</p>
                        <p className="text-sm text-gray-500">Default view period</p>
                      </div>
                      <select className="w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none">
                        <option value="month">This Month</option>
                        <option value="week">This Week</option>
                        <option value="day">Today</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 flex justify-end">
                  <Button className="bg-[#1A237E] hover:bg-[#0E1358]">
                    Save Preferences
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AccountSettings;
