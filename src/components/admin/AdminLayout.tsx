
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Layout, 
  LayoutContent, 
  LayoutHeader,
  LayoutSidebar 
} from "@/components/ui/layout";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  BarChart3,
  Users,
  Settings,
  Home,
  HelpCircle,
  Bell,
  LogOut,
  CreditCard,
  Link as LinkIcon,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setRole, signOut } = useAuth();
  const { toast } = useToast();
  
  const menuItems = [
    { 
      icon: <BarChart3 className="w-5 h-5" />, 
      label: "Dashboard", 
      path: "/admin" 
    },
    { 
      icon: <Users className="w-5 h-5" />, 
      label: "Users", 
      path: "/admin/users" 
    },
    { 
      icon: <CreditCard className="w-5 h-5" />, 
      label: "Finance", 
      path: "/admin/finance" 
    },
    { 
      icon: <LinkIcon className="w-5 h-5" />, 
      label: "Referrals", 
      path: "/admin/referrals" 
    },
    { 
      icon: <FileText className="w-5 h-5" />, 
      label: "Blog", 
      path: "/admin/blog" 
    },
    { 
      icon: <HelpCircle className="w-5 h-5" />, 
      label: "Support", 
      path: "/admin/support" 
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      label: "Settings", 
      path: "/admin/settings" 
    },
  ];

  const handleSwitchToUserView = () => {
    setRole('user');
    window.location.href = "/dashboard";
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Layout>
        <LayoutSidebar className="fixed top-0 left-0 h-screen w-64 bg-card shadow-md z-40">
          <div className="py-6 px-4">
            <Link to="/admin" className="flex items-center font-bold text-[20px] text-foreground mb-10">
              <img src="/lovable-uploads/img/logo/updatedlogo1.png" 
                alt="Professional AI Assistants" 
                className="h-10 mr-3 " style={{ width: 'auto', height: '3.5rem' }}
              />
              <span>Admin Panel</span>
            </Link>
            
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path || 
                    (item.path !== "/admin" && location.pathname.startsWith(item.path))
                    ? "bg-[#1A237E] text-white"
                    : "text-gray-700 hover:bg-[#F5F5F5] hover:text-foreground"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <div className="mb-1 mt-6">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center px-4 py-3 text-sm rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut size={18} className="mr-3" />
                  Sign Out
                </button>
              </div>
            </nav>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@example.com</p>
              </div>
            </div>
          </div>
        </LayoutSidebar>
        
        <div className="ml-64">
          <LayoutHeader className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-semibold text-foreground">
              {menuItems.find(item => 
                item.path === location.pathname || 
                (item.path !== "/admin" && location.pathname.startsWith(item.path))
              )?.label || "Admin Dashboard"}
            </h1>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-[#FF6F61]"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="py-2 px-4">
                    <p className="text-sm font-medium">Notifications</p>
                  </div>
                  <div className="py-2 px-4 text-sm text-gray-600">
                    <p>No new notifications</p>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="outline" 
                className="text-sm"
                onClick={handleSwitchToUserView}
              >
                Switch to User View
              </Button>
            </div>
          </LayoutHeader>
          
          <LayoutContent className="p-6">
            {children}
          </LayoutContent>
        </div>
      </Layout>
    </div>
  );
};

export default AdminLayout;
