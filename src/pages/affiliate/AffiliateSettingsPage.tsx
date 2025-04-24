
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  CreditCard, 
  User, 
  Bell, 
  Shield,
  Link,
  Mail
} from "lucide-react";

const AffiliateSettingsPage = () => {
  return (
    <AffiliateLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Account Settings</h2>
          <p className="text-muted-foreground">Manage your affiliate account preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Smith" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.smith@example.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Website/Blog URL</Label>
                    <Input id="website" type="url" defaultValue="https://johnsmith.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio/Description</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us a bit about yourself and how you promote products..."
                      className="min-h-[100px]"
                      defaultValue="Marketing professional specializing in digital services and SaaS products. I help businesses find the right tools to grow."
                    />
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="marketingConsent" defaultChecked />
                      <Label htmlFor="marketingConsent">Receive marketing emails</Label>
                    </div>
                    <Button type="submit" className="bg-[#1A237E]">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Manage your payment preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="paymentMethod">Preferred Payment Method</Label>
                    <Select defaultValue="paypal">
                      <SelectTrigger id="paymentMethod">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="paypalEmail">PayPal Email Address</Label>
                    <Input id="paypalEmail" type="email" defaultValue="john.smith@example.com" />
                  </div>
                  
                  <div className="border rounded-md p-4 bg-gray-50">
                    <h3 className="font-medium mb-2 flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" /> 
                      Alternative Payment Methods
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Need to receive payments through another method? Contact our affiliate team to set up custom payment options.
                    </p>
                    <Button variant="outline">Request Alternative Method</Button>
                  </div>
                  
                  <div>
                    <Label htmlFor="taxInfo">Tax Information</Label>
                    <Select defaultValue="individual">
                      <SelectTrigger id="taxInfo">
                        <SelectValue placeholder="Select tax status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual/Sole Proprietor</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">
                      This information is used for tax reporting purposes. You may need to submit a W-9 or similar form.
                    </p>
                  </div>
                  
                  <Button type="submit" className="bg-[#1A237E]">Save Payment Settings</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="new-referral" className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          New referral sign-ups
                        </Label>
                        <Switch id="new-referral" defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Label htmlFor="conversion" className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Conversion/commission earned
                        </Label>
                        <Switch id="conversion" defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Label htmlFor="payout" className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Payout processed
                        </Label>
                        <Switch id="payout" defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Label htmlFor="program" className="flex items-center">
                          <Bell className="h-4 w-4 mr-2" />
                          Program updates & announcements
                        </Label>
                        <Switch id="program" defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Label htmlFor="tips" className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Marketing tips & best practices
                        </Label>
                        <Switch id="tips" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-4">Notification Frequency</h3>
                    <div>
                      <Label htmlFor="frequency">Email Digest Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Summary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button className="bg-[#1A237E]">Save Notification Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Branding & Link Settings</CardTitle>
                <CardDescription>Customize how your affiliate links work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="vanity-url">Custom Vanity URL</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-shrink-0 text-gray-500">ai-assistants.com/ref/</div>
                      <Input id="vanity-url" defaultValue="john123" className="flex-1" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Customize the end of your referral link with a memorable name
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Label htmlFor="default-landing">Default Landing Page</Label>
                    <Select defaultValue="homepage">
                      <SelectTrigger id="default-landing">
                        <SelectValue placeholder="Select landing page" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homepage">Homepage</SelectItem>
                        <SelectItem value="pricing">Pricing Page</SelectItem>
                        <SelectItem value="features">Features Page</SelectItem>
                        <SelectItem value="special">Special Offer Page</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">
                      Choose which page users will land on when clicking your link
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Label className="mb-2 block">Link Tracking</Label>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="utm-tracking" className="flex items-center">
                          <Link className="h-4 w-4 mr-2" />
                          Add UTM parameters to track campaigns
                        </Label>
                        <Switch id="utm-tracking" defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Label htmlFor="subid-tracking" className="flex items-center">
                          <Link className="h-4 w-4 mr-2" />
                          Enable Sub-ID tracking for your campaigns
                        </Label>
                        <Switch id="subid-tracking" />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-[#1A237E]">Save Branding Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-4">Password</h3>
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Enable 2FA</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="twofa" />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-4">Login History</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-2">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-gray-600">Chrome on Windows • Los Angeles, CA</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div>
                          <p className="text-sm">April 20, 2025, 3:45 PM</p>
                          <p className="text-sm text-gray-600">Safari on macOS • San Francisco, CA</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div>
                          <p className="text-sm">April 18, 2025, 10:22 AM</p>
                          <p className="text-sm text-gray-600">Firefox on Linux • Seattle, WA</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="link" className="p-0 h-auto mt-2">View Full Login History</Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-4 flex items-center text-red-600">
                      <Shield className="h-4 w-4 mr-2" />
                      Danger Zone
                    </h3>
                    <Button variant="destructive">Deactivate Affiliate Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AffiliateLayout>
  );
};

// Missing Badge component, let's define it inline
const Badge = ({ className, children }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

export default AffiliateSettingsPage;
