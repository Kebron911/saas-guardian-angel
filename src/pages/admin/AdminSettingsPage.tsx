import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";

const GlobalSettingsTab = () => {
  const [appName, setAppName] = React.useState("Professional AI Assistants");
  const [companyName, setCompanyName] = React.useState("AI Assistants, Inc.");
  const [contactEmail, setContactEmail] = React.useState("contact@aiassistants.com");
  const [websiteUrl, setWebsiteUrl] = React.useState("https://aiassistants.com");
  const [defaultLanguage, setDefaultLanguage] = React.useState("en-US");
  const [timezone, setTimezone] = React.useState("America/New_York");
  const [appEnvironment, setAppEnvironment] = React.useState("production");
  const [defaultRole, setDefaultRole] = React.useState("user");
  const [maintenanceMode, setMaintenanceMode] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [saveError, setSaveError] = React.useState("");

  React.useEffect(() => {
    (async () => {
      try {
        const data = await apiClient.get("/admin/global-settings");
        setAppName(data.app_name ?? "Professional AI Assistants");
        setCompanyName(data.company_name ?? "AI Assistants, Inc.");
        setContactEmail(data.contact_email ?? "contact@aiassistants.com");
        setWebsiteUrl(data.website_url ?? "https://aiassistants.com");
        setDefaultLanguage(data.default_language ?? "en-US");
        setTimezone(data.timezone ?? "America/New_York");
        setAppEnvironment(data.app_environment ?? "production");
        setDefaultRole(data.default_role ?? "user");
        setMaintenanceMode(!!data.maintenance_mode);
      } catch (e) {}
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setSaveError("");
    try {
      await apiClient.post("/admin/global-settings", {
        app_name: appName,
        company_name: companyName,
        contact_email: contactEmail,
        website_url: websiteUrl,
        default_language: defaultLanguage,
        timezone: timezone,
        app_environment: appEnvironment,
        default_role: defaultRole,
        maintenance_mode: maintenanceMode,
      });
      setSaveSuccess(true);
    } catch (e) {
      setSaveError(e.detail || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="app-name" className="text-sm font-medium">App Name</label>
              <Input id="app-name" value={appName} onChange={e => setAppName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label htmlFor="company-name" className="text-sm font-medium">Company Name</label>
              <Input id="company-name" value={companyName} onChange={e => setCompanyName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-medium">Contact Email</label>
              <Input id="contact-email" type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label htmlFor="website-url" className="text-sm font-medium">Website URL</label>
              <Input id="website-url" value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="default-language" className="text-sm font-medium">Default Language</label>
              <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
                <SelectTrigger id="default-language">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (United States)</SelectItem>
                  <SelectItem value="en-GB">English (United Kingdom)</SelectItem>
                  <SelectItem value="es-ES">Spanish (Spain)</SelectItem>
                  <SelectItem value="fr-FR">French (France)</SelectItem>
                  <SelectItem value="de-DE">German (Germany)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="timezone" className="text-sm font-medium">Timezone</label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select Timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                  <SelectItem value="Europe/London">London</SelectItem>
                  <SelectItem value="Europe/Paris">Paris</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="app-environment" className="text-sm font-medium">App Environment</label>
              <Select value={appEnvironment} onValueChange={setAppEnvironment}>
                <SelectTrigger id="app-environment">
                  <SelectValue placeholder="Select Environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="default-role" className="text-sm font-medium">Default Signup Role</label>
              <Select value={defaultRole} onValueChange={setDefaultRole}>
                <SelectTrigger id="default-role">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="affiliate">Affiliate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="maintenance-mode" className="h-4 w-4 rounded border-gray-300" checked={maintenanceMode} onChange={e => setMaintenanceMode(e.target.checked)} />
                <label htmlFor="maintenance-mode" className="text-sm font-medium">Maintenance Mode</label>
              </div>
              <p className="text-xs text-gray-500">When enabled, only administrators can access the site</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-end gap-2">
          <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Settings"}</Button>
          {saveSuccess && <span className="text-green-600 text-sm">Settings saved!</span>}
          {saveError && <span className="text-red-600 text-sm">{saveError}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

const InvoiceSettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="company-name" className="text-sm font-medium">Company Name</label>
              <Input id="company-name" defaultValue="AI Assistants, Inc." />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="company-address" className="text-sm font-medium">Company Address</label>
              <textarea 
                id="company-address" 
                rows={3} 
                className="w-full min-h-[80px] p-2 border border-gray-300 rounded-md"
                defaultValue="123 Main Street, Suite 100, San Francisco, CA 94105, United States"
              ></textarea>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tax-id" className="text-sm font-medium">Tax ID / VAT Number</label>
              <Input id="tax-id" defaultValue="US 123456789" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="invoice-prefix" className="text-sm font-medium">Invoice Prefix</label>
              <Input id="invoice-prefix" defaultValue="INV-" />
              <p className="text-xs text-gray-500">Will appear before invoice numbers (e.g. INV-0001)</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="footer-notes" className="text-sm font-medium">Invoice Footer Notes</label>
              <textarea 
                id="footer-notes" 
                rows={3} 
                className="w-full min-h-[80px] p-2 border border-gray-300 rounded-md"
                defaultValue="Thank you for your business. Payment terms: Due upon receipt."
              ></textarea>
            </div>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="auto-invoice" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                <label htmlFor="auto-invoice" className="text-sm font-medium">Auto-generate invoices</label>
              </div>
              <p className="text-xs text-gray-500">Automatically generate invoices for subscription payments</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="invoice-logo" className="text-sm font-medium">Invoice Logo</label>
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">Logo</div>
                <Button variant="outline">Upload Logo</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="text-sm font-medium mb-2">Invoice Preview</h4>
            <div className="bg-white border rounded-md h-40 flex items-center justify-center text-gray-400">
              Invoice preview will appear here
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const SystemSettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="app-version" className="text-sm font-medium">App Version</label>
              <Input id="app-version" value="v2.5.0" readOnly disabled className="bg-gray-50" />
            </div>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="enable-logging" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                <label htmlFor="enable-logging" className="text-sm font-medium">Enable Detailed Logging</label>
              </div>
              <p className="text-xs text-gray-500">Log detailed information for debugging purposes</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="api-rate-limit" className="text-sm font-medium">API Rate Limit (requests per minute)</label>
              <Input id="api-rate-limit" type="number" defaultValue="60" min="1" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="allowed-ips" className="text-sm font-medium">Allowed IPs for Admin Access</label>
              <textarea 
                id="allowed-ips" 
                rows={3} 
                className="w-full min-h-[80px] p-2 border border-gray-300 rounded-md"
                placeholder="Leave empty to allow all IPs"
              ></textarea>
              <p className="text-xs text-gray-500">Enter one IP address per line (e.g. 192.168.1.1)</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="custom-code" className="text-sm font-medium">Custom JS / CSS</label>
              <textarea 
                id="custom-code" 
                rows={5} 
                className="w-full min-h-[120px] p-2 border border-gray-300 rounded-md font-mono text-sm"
                placeholder="/* Add custom CSS or JavaScript here */"
              ></textarea>
              <p className="text-xs text-gray-500">Custom code will be added to all pages</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const EmailSettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="from-name" className="text-sm font-medium">From Name</label>
              <Input id="from-name" defaultValue="Professional AI Assistants" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="from-email" className="text-sm font-medium">From Email</label>
              <Input id="from-email" type="email" defaultValue="no-reply@aiassistants.com" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="smtp-host" className="text-sm font-medium">SMTP Host</label>
              <Input id="smtp-host" defaultValue="smtp.example.com" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="smtp-port" className="text-sm font-medium">SMTP Port</label>
              <Input id="smtp-port" type="number" defaultValue="587" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="smtp-username" className="text-sm font-medium">SMTP Username</label>
              <Input id="smtp-username" defaultValue="smtp_user@example.com" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="smtp-password" className="text-sm font-medium">SMTP Password</label>
              <Input id="smtp-password" type="password" value="••••••••••••" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="encryption-type" className="text-sm font-medium">Encryption</label>
              <Select defaultValue="tls">
                <SelectTrigger id="encryption-type">
                  <SelectValue placeholder="Select Encryption" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tls">TLS</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 flex items-end mt-6">
              <Button className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Test Email
              </Button>
              <div className="ml-3 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Configured
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const AdminSettingsPage = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">System Settings</h2>
        <p className="text-gray-500">Configure global settings for your application</p>
      </div>

      <Tabs defaultValue="global" className="w-full">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="invoice">Invoice</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="global">
          <GlobalSettingsTab />
        </TabsContent>
        <TabsContent value="invoice">
          <InvoiceSettingsTab />
        </TabsContent>
        <TabsContent value="system">
          <SystemSettingsTab />
        </TabsContent>
        <TabsContent value="email">
          <EmailSettingsTab />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
