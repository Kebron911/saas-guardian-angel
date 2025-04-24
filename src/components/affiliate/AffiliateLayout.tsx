
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Layout, 
  LayoutContent, 
  LayoutHeader,
  LayoutSidebar 
} from "@/components/ui/layout";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  BarChart3,
  Settings,
  Home,
  MessageSquare,
  HelpCircle,
  Bell,
  LogOut,
  Link as LinkIcon,
  Share,
  DollarSign,
  FileImage
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

interface AffiliateLayoutProps {
  children: React.ReactNode;
}

const AffiliateLayout = ({ children }: AffiliateLayoutProps) => {
  const location = useLocation();
  const { setRole } = useAuth();
  
  const menuItems = [
    { 
      icon: <Home className="w-5 h-5" />, 
      label: "Dashboard", 
      path: "/affiliate" 
    },
    { 
      icon: <BarChart3 className="w-5 h-5" />, 
      label: "Performance", 
      path: "/affiliate/performance" 
    },
    { 
      icon: <FileImage className="w-5 h-5" />, 
      label: "Marketing Assets", 
      path: "/affiliate/marketing" 
    },
    { 
      icon: <DollarSign className="w-5 h-5" />, 
      label: "Payouts", 
      path: "/affiliate/payouts" 
    },
    { 
      icon: <HelpCircle className="w-5 h-5" />, 
      label: "Support", 
      path: "/affiliate/support" 
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      label: "Settings", 
      path: "/affiliate/settings" 
    },
  ];

  const handleSwitchToUserView = () => {
    setRole('user');
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-background">
      <Layout>
        <LayoutSidebar className="fixed top-0 left-0 h-screen w-64 bg-card shadow-md z-40">
          <div className="py-6 px-4">
            <Link to="/" className="flex items-center font-bold text-[20px] text-foreground mb-10">
              <div className="w-[30px] h-[30px] bg-[#1A237E] rounded-full mr-3 relative">
                <div className="absolute w-[15px] h-[12px] bg-white rounded-t-full top-2 left-[7px]" />
              </div>
              <span>Affiliate Program</span>
            </Link>
            
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path || 
                    (item.path !== "/affiliate" && location.pathname.startsWith(item.path))
                    ? "bg-[#1A237E] text-white"
                    : "text-gray-700 hover:bg-[#F5F5F5] hover:text-foreground"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AF</AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium">John Smith</p>
                <p className="text-xs text-gray-500 truncate">Affiliate Partner</p>
              </div>
              <Button variant="ghost" size="icon" className="ml-1">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </LayoutSidebar>
        
        <div className="ml-64">
          <LayoutHeader className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-semibold text-foreground">
              {menuItems.find(item => 
                item.path === location.pathname || 
                (item.path !== "/affiliate" && location.pathname.startsWith(item.path))
              )?.label || "Affiliate Dashboard"}
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

export default AffiliateLayout;
