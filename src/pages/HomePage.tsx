import React from "react";
import { Link } from "react-router-dom";
import HomeHeroSection from "@/components/HomeHeroSection";
import HomeFeaturesSection from "@/components/HomeFeaturesSection";
import HomeBenefitsSection from "@/components/HomeBenefitsSection";
import HomeHowItWorksSection from "@/components/HomeHowItWorksSection";
import HomeUseCasesSection from "@/components/HomeUseCasesSection";
import HomeFAQSection from "@/components/HomeFAQSection";
import BlogPosts from "@/components/BlogPosts";
import BlogNewsletter from "@/components/BlogNewsletter";

const HomePage = () => {
  return (
    <div className="font-sans bg-white text-[#333]">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm shadow-lg z-50 transition-all duration-300 hover:bg-white">
        <div className="container max-w-[1200px] mx-auto px-5">
          <div className="flex justify-between items-center py-5 flex-col md:flex-row">
            <Link to="/" className="flex items-center font-bold text-[24px] text-[#1A237E] mb-3 md:mb-0">
              <img 
                src="/lovable-uploads/332ae568-86d8-4c46-ac45-7a8c67c76215.png" 
                alt="Professional AI Assistants" 
                className="h-10 mr-3"
              />
            </Link>
            <nav>
              <ul className="flex flex-wrap md:flex-nowrap gap-4 md:gap-8 text-base font-semibold">
                <li><a href="#features" className="hover:text-[#00B8D4]">Features</a></li>
                <li><a href="#benefits" className="hover:text-[#00B8D4]">Benefits</a></li>
                <li><a href="#how-it-works" className="hover:text-[#00B8D4]">How It Works</a></li>
                <li><a href="#use-cases" className="hover:text-[#00B8D4]">Use Cases</a></li>
                <li><a href="#faq" className="hover:text-[#00B8D4]">FAQ</a></li>
                <li><a href="#blog" className="hover:text-[#00B8D4]">Blog</a></li>
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
                to="/login" 
                className="bg-[#00B8D4] text-white px-6 py-3 rounded font-bold hover:bg-[#009cb8] transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-[140px]">
        <HomeHeroSection />
        
        {/* Features Section with enhanced visuals */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#E3F2FD]/50 to-transparent pointer-events-none" />
          <HomeFeaturesSection />
        </div>

        {/* Benefits Section with subtle animation */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8F9FA] to-white pointer-events-none" />
          <HomeBenefitsSection />
        </div>

        {/* How It Works Section with enhanced visuals */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#E3F2FD]/30 to-transparent pointer-events-none" />
          <HomeHowItWorksSection />
        </div>

        <HomeUseCasesSection />
        <HomeFAQSection />

        {/* Blog Section with subtle animation */}
        <section id="blog" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container max-w-[1200px] mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A237E] mb-12 hover:scale-105 transition-transform duration-300">
              Latest Insights & Updates
            </h2>
            <BlogPosts />
            <BlogNewsletter />
          </div>
        </section>

        {/* CTA Section with enhanced visuals */}
        <section className="cta-section bg-gradient-to-br from-[#1A237E] to-[#141c64] text-white py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAyNmMtNC40MTEgMC04LTMuNTg5LTgtOHMzLjU4OS04IDgtOCA4IDMuNTg5IDggOC0zLjU4OSA4LTggOHoiIG9wYWNpdHk9Ii4xIiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
          <div className="container max-w-[1200px] mx-auto px-5 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A237E] mb-5">Start Your AI Receptionist Trial Today</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">Join thousands of businesses already saving time and money while providing better customer service. Try it risk-free with our 14-day money-back guarantee.</p>
            <div className="flex flex-wrap justify-center gap-5">
              <a href="#" className="bg-[#00B8D4] text-white px-6 py-3 rounded font-bold text-lg hover:bg-[#009cb8] transition">Start Your Free Trial</a>
              <a href="#" className="border-2 border-white text-white px-6 py-3 rounded font-bold text-lg hover:bg-white hover:text-[#1A237E] transition">Live Demo</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with subtle animation */}
      <footer className="bg-[#333] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAyNmMtNC40MTEgMC04LTMuNTg5LTgtOHMzLjU4OS04IDgtOCA4IDMuNTg5IDggOC0zLjU4OSA4LTggOHoiIG9wYWNpdHk9Ii4xIiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')] opacity-5" />
        <div className="container max-w-[1200px] mx-auto px-5 relative">
          <div className="footer-columns grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="footer-column">
              <h3 className="font-bold text-lg mb-4">About Us</h3>
              <p className="text-[#bbb] mb-6">We are dedicated to providing cutting-edge AI solutions that transform the way businesses operate and serve their customers.</p>
              <div className="social-links flex space-x-3">
                <a href="#" className="w-10 h-10 rounded-full bg-[#555] text-white inline-flex items-center justify-center hover:bg-[#00B8D4] transition">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2H15C13.7913 2 12.6174 2.47492 11.6716 3.32233C10.7258 4.16975 10.1361 5.26148 10 6.5V9H7V12H10V22H14V12H17L18 9H14V7C14 6.44772 14.4477 6 15 6H18V2Z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#555] text-white inline-flex items-center justify-center hover:bg-[#00B8D4] transition">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 5.115C21.247 5.457 20.451 5.692 19.621 5.828C20.472 5.319 21.146 4.598 21.534 3.73C20.729 4.205 19.842 4.552 18.893 4.766C18.119 4.024 17.177 3.585 16.144 3.49C15.112 3.395 14.106 3.645 13.228 4.203C12.35 4.761 11.644 5.575 11.285 6.53C9.961 6.461 8.67 6.044 7.48 5.305C6.289 4.566 5.241 3.534 4.38 2.358C4.075 3.029 4.075 3.097 4.271 3.476C4.424 3.777 4.749 4.219 5.017 5.011C5.573 5.644 6.276 6.044 5.645 6.025C5.042 5.834 4.496 5.5 4.496 5.5" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-column">
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="list-none">
                <li className="mb-2"><a href="#features" className="text-[#bbb] hover:text-white">Features</a></li>
                <li className="mb-2"><a href="#benefits" className="text-[#bbb] hover:text-white">Benefits</a></li>
                <li className="mb-2"><a href="#how-it-works" className="text-[#bbb] hover:text-white">How It Works</a></li>
                <li className="mb-2"><a href="#use-cases" className="text-[#bbb] hover:text-white">Use Cases</a></li>
                <li><a href="#faq" className="text-[#bbb] hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <p className="text-[#bbb] mb-2">123 AI Innovation Way<br />Tech City, CA 91234</p>
              <p className="text-[#bbb] mb-2">Email: info@example.com<br />Phone: (555) 123-4567</p>
            </div>
            <div className="footer-column">
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="list-none">
                <li className="mb-2"><a href="#" className="text-[#bbb] hover:text-white">Privacy Policy</a></li>
                <li className="mb-2"><a href="#" className="text-[#bbb] hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-[#bbb] hover:text-white">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#555] pt-8 text-center text-[#bbb]">
            <p>© 2025 Professional AI Assistants. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
