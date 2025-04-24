
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import Dashboard from "@/pages/Dashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import ReceptionistSetup from "@/pages/ReceptionistSetup";
import Reports from "@/pages/Reports";
import AccountSettings from "@/pages/AccountSettings";
import HelpSupport from "@/pages/HelpSupport";
import AffiliateDashboard from "@/pages/AffiliateDashboard";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import AdminFinancePage from "@/pages/admin/AdminFinancePage";
import AdminReferralsPage from "@/pages/admin/AdminReferralsPage";
import AdminSupportPage from "@/pages/admin/AdminSupportPage";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              
              {/* User Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/setup" element={<ReceptionistSetup />} />
              <Route path="/dashboard/reports" element={<Reports />} />
              <Route path="/dashboard/settings" element={<AccountSettings />} />
              <Route path="/dashboard/help" element={<HelpSupport />} />
              <Route path="/dashboard/affiliate" element={<AffiliateDashboard />} />
              
              {/* Admin Dashboard Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/finance" element={<AdminFinancePage />} />
              <Route path="/admin/referrals" element={<AdminReferralsPage />} />
              <Route path="/admin/support" element={<AdminSupportPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
