import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  Settings, 
  Phone, 
  BarChart2, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X,
  CreditCard,
  Users
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", path: "/admin" },
    { icon: <Phone size={18} />, label: "Receptionist Setup", path: "/dashboard/setup" },
    { icon: <BarChart2 size={18} />, label: "Reports", path: "/dashboard/reports" },
    { icon: <CreditCard size={18} />, label: "Billing", path: "/dashboard/billing" },
    { icon: <Users size={18} />, label: "Affiliate Program", path: "/dashboard/affiliate" },
    { icon: <Settings size={18} />, label: "Settings", path: "/dashboard/settings" },
    { icon: <HelpCircle size={18} />, label: "Help & Support", path: "/dashboard/help" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top mobile navigation bar */}
      <div className="lg:hidden bg-white dark:bg-gray-800 shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          
          <Link to="/" className="text-xl font-bold text-[#1A237E] dark:text-white">AI Receptionist</Link>
        </div>
        <button onClick={toggleMobileMenu} className="p-2">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar - desktop view */}
        <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen fixed">
          <div className="p-6">
            <Link to="/" className="text-xl font-bold text-[#1A237E] dark:text-white">AI Receptionist</Link>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="px-4 py-2">
              {menuItems.map((item, index) => (
                <li key={index} className="mb-1">
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                      location.pathname === item.path
                        ? "bg-[#E3F2FD] text-[#1A237E] dark:bg-[#1A237E]/20 dark:text-white font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mb-1 mt-6">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center px-4 py-3 text-sm rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut size={18} className="mr-3" />
                  Sign Out
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white dark:bg-gray-800">
            <div className="flex justify-end p-4">
              <button onClick={toggleMobileMenu} className="p-2">
                <X size={24} className="text-gray-900 dark:text-gray-100" />
              </button>
            </div>
            <nav className="px-6 py-4">
              <ul>
                {menuItems.map((item, index) => (
                  <li key={index} className="mb-3">
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                        location.pathname === item.path
                          ? "bg-[#E3F2FD] text-[#1A237E] dark:bg-[#1A237E]/20 dark:text-white font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      onClick={toggleMobileMenu}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="mb-3 mt-6">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center px-4 py-3 text-sm rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut size={18} className="mr-3" />
                    Sign Out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Main content area */}
        <main className="flex-1 lg:ml-64 p-6">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
