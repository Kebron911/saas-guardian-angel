
import React from "react";
import { Link, useLocation } from "react-router-dom";

const PageHeader = () => {
  const location = useLocation();
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="container max-w-[1200px] mx-auto px-5">
        <div className="flex justify-between items-center py-5 flex-col md:flex-row">
          <Link to="/" className="flex items-center font-bold text-[24px] text-[#1A237E] mb-3 md:mb-0">
            <img src="/lovable-uploads/img/logo/updatedlogo1.png" 
                alt="Professional AI Assistants" 
                className="h-10 mr-3 " style={{ width: 'auto', height: '3.5rem' }}
              />
            
          </Link>
          <nav>
            <ul className="flex flex-wrap md:flex-nowrap gap-4 md:gap-16 text-base font-semibold">
              <li><a href={location.pathname === "/blog" ? "/#features" : "#features"} className="hover:text-[#00B8D4]">Features</a></li>
              {location.pathname === "/blog" ? (
                <>
                  <li><a href="/#roles" className="hover:text-[#00B8D4]">AI Roles</a></li>
                  <li><a href="/#pricing" className="hover:text-[#00B8D4]">Pricing</a></li>
                  <li><a href="/#faq" className="hover:text-[#00B8D4]">FAQ</a></li>
                  <li><Link to="/blog" className="text-[#00B8D4] font-bold">Blog</Link></li>
                  <li><a href="/#contact" className="hover:text-[#00B8D4]">Contact</a></li>
                </>
              ) : (
                <>
                  <li><a href="/#benefits" className="hover:text-[#00B8D4]">Benefits</a></li>
                  <li><a href="/#how-it-works" className="hover:text-[#00B8D4]">How It Works</a></li>
                  <li><a href="/#use-cases" className="hover:text-[#00B8D4]">Use Cases</a></li>
                  <li><a href="/#faq" className="hover:text-[#00B8D4]">FAQ</a></li>
                  <li><Link to="/blog" className="hover:text-[#00B8D4]">Blog</Link></li>
                </>
              )}
            </ul>
          </nav>
          <div className="flex items-center mt-5 md:mt-0">
            <Link 
              to="/login" 
              className="px-5 py-2 border-2 border-[#1A237E] text-[#1A237E] font-bold rounded mr-3 hover:bg-[#1A237E] hover:text-white transition"
              >
              Log In
            </Link>
            <Link 
              to="/order" 
              className="bg-[#00B8D4] text-white px-6 py-3 rounded font-bold hover:bg-[#009cb8] transition"
              >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
