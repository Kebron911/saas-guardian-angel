
import React from "react";
import { Link, useLocation } from "react-router-dom";

const LegalNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="flex flex-wrap gap-2 md:gap-6 mb-8 text-sm">
      <Link 
        to="/privacy-policy" 
        className={`${isActive('/privacy-policy') ? 'bg-[#1A237E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-4 py-2 rounded-full transition-colors`}
      >
        Privacy Policy
      </Link>
      <Link 
        to="/terms-of-service" 
        className={`${isActive('/terms-of-service') ? 'bg-[#1A237E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-4 py-2 rounded-full transition-colors`}
      >
        Terms of Service
      </Link>
      <Link 
        to="/gdpr-compliance" 
        className={`${isActive('/gdpr-compliance') ? 'bg-[#1A237E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-4 py-2 rounded-full transition-colors`}
      >
        GDPR Compliance
      </Link>
      <Link 
        to="/cookie-policy" 
        className={`${isActive('/cookie-policy') ? 'bg-[#1A237E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-4 py-2 rounded-full transition-colors`}
      >
        Cookie Policy
      </Link>
    </nav>
  );
};

export default LegalNav;
