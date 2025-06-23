
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { 
  User, 
  Lock, 
  BellRing, 
  Globe, 
  LogOut,
  Check,
  CreditCard
} from "lucide-react";

const AccountSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings Updated",
        description: "Your account settings have been saved successfully.",
      });
    }, 1000);
  };
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Account Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 md:w-auto md:inline-flex mb-6">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <BellRing className="h-4 w-4 mr-2" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            <span>Preferences</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and company information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" defaultValue="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>View and manage your subscription details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-[#E3F2FD] dark:bg-[#1A237E]/20 rounded-full">
                  <CreditCard className="h-5 w-5 text-[#1A237E] dark:text-[#00B8D4]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Manage your subscription</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    View your current plan, payment methods, and billing history
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/dashboard/billing">
                    Go to Billing
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-500 dark:text-red-400">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions for your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sign out from all devices</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    End all active sessions on other devices
                  </p>
                </div>
                <Button variant="outline" className="border-red-300 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-950/30">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out All
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <p className="font-medium">Authenticator App</p>
                    <span className="ml-2 rounded-full bg-green-100 dark:bg-green-900 px-2 py-0.5 text-xs text-green-700 dark:text-green-300">Recommended</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use an authenticator app to generate verification codes
                  </p>
                </div>
                <Button variant="outline">Setup</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">SMS Authentication</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive verification codes via text message
                  </p>
                </div>
                <Button variant="outline">Setup</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Recovery Codes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Generate backup codes for account access
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Login Sessions</CardTitle>
              <CardDescription>Manage your active login sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <p className="font-medium">Current Session</p>
                      <span className="ml-2 rounded-full bg-green-100 dark:bg-green-900 px-2 py-0.5 text-xs text-green-700 dark:text-green-300">Active</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Chrome on Mac OS X – New York, USA
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Just now</span>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="space-y-0.5">
                    <p className="font-medium">Mobile Session</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Safari on iPhone – Seattle, USA
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">2 days ago</span>
                    <Button variant="ghost" size="sm">Revoke</Button>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-4">Revoke All Sessions</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive important updates via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Billing Alerts</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Get notified about upcoming charges
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Call Notifications</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive alerts for missed calls
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Product Updates</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Learn about new features and improvements
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive our monthly newsletter with industry insights
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              <Button onClick={handleSave} className="mt-6" disabled={loading}>
                {loading ? "Saving..." : "Save Preferences"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Interface Settings</CardTitle>
              <CardDescription>Customize the application interface</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <p className="font-medium">Compact Mode</p>
                      <span className="ml-2 rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-0.5 text-xs text-blue-700 dark:text-blue-300">New</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Display more information at once with a compact layout
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Quick Actions</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Show quick action buttons in the dashboard
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Time Format</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Choose your preferred time format
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20">
                      <Check className="h-4 w-4 mr-2" />
                      24-hour
                    </Button>
                    <Button variant="outline" size="sm">
                      12-hour
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Date Format</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Choose your preferred date format
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      DD/MM/YYYY
                    </Button>
                    <Button variant="outline" size="sm" className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20">
                      <Check className="h-4 w-4 mr-2" />
                      MM/DD/YYYY
                    </Button>
                  </div>
                </div>
              </div>
              <Button onClick={handleSave} className="mt-6" disabled={loading}>
                {loading ? "Saving..." : "Save Settings"}
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Receptionist Settings</CardTitle>
              <CardDescription>Configure your AI receptionist preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Automated Responses</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Use AI to automatically respond to common inquiries
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Call Recording</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Record calls for quality and training purposes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Call Transcription</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Generate text transcripts of your calls
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Language</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Set the primary language for your receptionist
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20">
                      <Check className="h-4 w-4 mr-2" />
                      English
                    </Button>
                    <Button variant="outline" size="sm">
                      More...
                    </Button>
                  </div>
                </div>
              </div>
              <Button onClick={handleSave} className="mt-6" disabled={loading}>
                {loading ? "Saving..." : "Save Preferences"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AccountSettings;
