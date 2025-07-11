import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import LoginPage from "@/pages/LoginPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import BlogCategoriesPage from "@/pages/BlogCategoriesPage";
import Dashboard from "@/pages/Dashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import ReceptionistSetup from "@/pages/ReceptionistSetup";
import Reports from "@/pages/Reports";
import AccountSettings from "@/pages/AccountSettings";
import HelpSupport from "@/pages/HelpSupport";
import BillingPage from "@/pages/BillingPage";
import AffiliateDashboard from "@/pages/AffiliateDashboard";
import OrderForm from "@/pages/OrderForm";
import DashboardAffiliatePage from "@/pages/DashboardAffiliatePage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import GdprCompliance from "@/pages/GdprCompliance";
import CookiePolicy from "@/pages/CookiePolicy";
import CommunityForumPage from "./pages/CommunityForumPage";
import CalculatorPage from "./pages/CalculatorPage";

// Admin Routes
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import AdminFinancePage from "@/pages/admin/AdminFinancePage";
import AdminReferralsPage from "@/pages/admin/AdminReferralsPage";
import AdminSupportPage from "@/pages/admin/AdminSupportPage";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";
import AdminBlogPage from "@/pages/admin/AdminBlogPage";

// Affiliate Routes
import AffiliatePerformancePage from "@/pages/affiliate/AffiliatePerformancePage";
import AffiliateMarketingPage from "@/pages/affiliate/AffiliateMarketingPage";
import AffiliatePayoutsPage from "@/pages/affiliate/AffiliatePayoutsPage";
import AffiliateSupportPage from "@/pages/affiliate/AffiliateSupportPage";
import AffiliateSettingsPage from "@/pages/affiliate/AffiliateSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AuthProvider>
          <SubscriptionProvider>
            <Toaster />
            <Sonner />
            <Router>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                
                <Route path="/" element={<Index />} />
               
                
                {/* Public Blog Routes */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/order" element={<OrderForm />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/blog/category/:slug" element={<BlogCategoriesPage />} />
                
                {/* Legal Pages */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/gdpr-compliance" element={<GdprCompliance />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                
                {/* User Dashboard Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/setup" element={<ReceptionistSetup />} />
                <Route path="/dashboard/reports" element={<Reports />} />
                <Route path="/dashboard/settings" element={<AccountSettings />} />
                <Route path="/dashboard/help" element={<HelpSupport />} />
                <Route path="/dashboard/billing" element={<BillingPage />} />
                <Route path="/dashboard/affiliate" element={<DashboardAffiliatePage />} />
                
                {/* Affiliate Dashboard Routes */}
                <Route path="/affiliate" element={<AffiliateDashboard />} />
                <Route path="/affiliate/performance" element={<AffiliatePerformancePage />} />
                <Route path="/affiliate/marketing" element={<AffiliateMarketingPage />} />
                <Route path="/affiliate/payouts" element={<AffiliatePayoutsPage />} />
                <Route path="/affiliate/support" element={<AffiliateSupportPage />} />
                <Route path="/affiliate/settings" element={<AffiliateSettingsPage />} />
                
                {/* Admin Dashboard Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsersPage />} />
                <Route path="/admin/finance" element={<AdminFinancePage />} />
                <Route path="/admin/referrals" element={<AdminReferralsPage />} />
                <Route path="/admin/support" element={<AdminSupportPage />} />
                <Route path="/admin/settings" element={<AdminSettingsPage />} />
                <Route path="/admin/blog" element={<AdminBlogPage />} />
                
                {/* Community Forum Page */}
                <Route path="/forum" element={<CommunityForumPage />} />
                
                {/* Calculator Page */}
                <Route path="/calculator" element={<CalculatorPage />} />
                
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </SubscriptionProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
