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
import PricingSection from "@/components/PricingSection";

const HomePage = () => {


  return (
    <div className="font-sans bg-white text-[#333]">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm shadow-lg z-50 transition-all duration-300 hover:bg-white">
        <div className="container max-w-[1500px] mx-auto px-5">
          <div className="flex justify-between items-center py-5 flex-col md:flex-row">
            <Link
              to="/"
              className="flex items-center font-bold text-[24px] text-[#1A237E] mb-3 md:mb-0"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src="/lovable-uploads/img/logo/updatedlogo1.png"
                alt="Professional AI Assistants"
                className="h-10 mr-3"
                style={{ marginLeft: '5rem', width: 'auto', height: '3.5rem' }}
              />
            </Link>
            <nav>
              <ul className="flex flex-wrap md:flex-nowrap gap-4 md:gap-16 text-base font-semibold">
                <li><a href="#features" className="hover:text-[#00B8D4]">Features</a></li>
                <li><a href="#benefits" className="hover:text-[#00B8D4]">Benefits</a></li>
                <li><a href="#how-it-works" className="hover:text-[#00B8D4]">How It Works</a></li>
                <li><a href="#use-cases" className="hover:text-[#00B8D4]">Use Cases</a></li>
                <li><a href="#faq" className="hover:text-[#00B8D4]">FAQ</a></li>
                <li><a href="#blog" className="hover:text-[#00B8D4]">Blog</a></li>
                <li><Link to="/order" className="hover:text-[#00B8D4]">Order</Link></li>
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

      <main className="pt-[140px]">
        <HomeHeroSection />
        
        <div className="relative pb-1">
          <div className="absolute bg-gradient-to-b from-[#E3F2FD]/50 to-transparent pointer-events-none" /> 
          <HomeFeaturesSection />
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute bg-gradient-to-br from-[#F8F9FA] to-white pointer-events-none" />
          <HomeBenefitsSection />
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#E3F2FD]/30 to-transparent pointer-events-none" />
          <HomeHowItWorksSection />
        </div>

        <HomeUseCasesSection />
        
        <PricingSection />
        
        <HomeFAQSection />

        <section id="blog" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container max-w-[1200px] mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A237E] mb-12 hover:scale-105 transition-transform duration-300">
              Latest Insights & Updates
            </h2>
            <BlogPosts />
            <BlogNewsletter />
          </div>
        </section>

        <section className="cta-section bg-gradient-to-br from-[#1A237E] to-[#141c64] py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAyNmMtNC40MTEgMC04LTMuNTg5LTgtOHMzLjU4OS04IDgtOCA4IDMuNTg5IDggOC0zLjU4OSA4LTggOHoiIG9wYWNpdHk9Ii4xIiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
          <div className="container max-w-[1200px] mx-auto px-5 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-5">Starts Your AI Receptionist Trial Today</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-white/90">Join thousands of businesses already saving time and money while providing better customer service. Try it risk-free with our 14-day money-back guarantee.</p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link to="/order" className="bg-[#00B8D4] text-white px-6 py-3 rounded font-bold text-lg hover:bg-[#009cb8] transition">Start Your Free Trial</Link>
              <a href="#" className="border-2 border-white text-white px-6 py-3 rounded font-bold text-lg hover:bg-white hover:text-[#1A237E] transition">Live Demo</a>
              <Link
                to="/calculator"
                className="bg-[#00B8D4] text-black px-6 py-3 rounded font-bold text-lg hover:bg-white hover:border-2 border-black hover:text-[#1A237E] transition">
                Calculate your Savings
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#333] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAyNmMtNC40MTEgMC04LTMuNTg5LTgtOHMzLjU4OS04IDgtOCA4IDMuNTg5IDggOC0zLjU4OSA4LTggOHoiIG9wYWNpdHk9Ii4xIiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')] opacity-5" />
        <div className="container max-w-[1200px] mx-auto px-5 relative">
          <div className="footer-columns grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="footer-column">
              <h3 className="font-bold text-lg mb-4">About Us</h3>
              <p className="text-[#bbb] mb-6">We are dedicated to providing cutting-edge AI solutions that transform the way businesses operate and serve their customers.</p>
              <div className="social-links flex space-x-3">
                
                <a
                  href="https://www.linkedin.com/in/professional-ai-assistant-7b6a07366/" // Update with your actual LinkedIn profile
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#555] text-white inline-flex items-center justify-center hover:bg-[#00B8D4] transition"
                >
                  <img
                    src="/lovable-uploads/img/footer/linkedin.png"
                    alt="LinkedIn"
                    className="w-5 h-5"
                    style={{ display: 'block' }}
                  />
                </a>
                
                <a
                  href="https://x.com/ProAIAssistants" // Update with your actual Twitter/X profile
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#555] text-white inline-flex items-center justify-center hover:bg-[#00B8D4] transition"
                >
                  <img
                    src="/lovable-uploads/img/footer/twitterlogo.png"
                    alt="Twitter/X"
                    className="w-5 h-5"
                    style={{ display: 'block' }}
                  />
                </a>
                <a
                  href="https://www.pinterest.com/proaiassistants/_profile/_created/" // Update with your actual Pinterest profile
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#555] text-white inline-flex items-center justify-center hover:bg-[#00B8D4] transition"
                >
                  <img
                    src="/lovable-uploads/img/footer/Pinterest.png"
                    alt="Pinterest"
                    className="w-5 h-5"
                    style={{ display: 'block' }}
                  />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCbs4a8Ev6--9uJeHHfcv_Hw" // Update with your actual Youtube profile
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#555] text-white inline-flex items-center justify-center hover:bg-[#00B8D4] transition"
                >
                  <img
                    src="/lovable-uploads/img/footer/youtube.png"
                    alt="Youtube"
                    className="w-5 h-5"
                    style={{ display: 'block' }}
                  />
                </a>
                <a
                  href="https://www.tiktok.com/@proaiassistants" // Update with your actual Tiktok profile
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#555] text-white inline-flex items-center justify-center hover:bg-[#00B8D4] transition"
                >
                  <img
                    src="/lovable-uploads/img/footer/Tiktok1.png"
                    alt="Tiktok"
                    className="w-5 h-5"
                    style={{ display: 'block' }}
                  />
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
                
            <p>8269 Iron Horse <br />Lake Point, UT 84074</p>
            <p>
              Email:{" "}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@professionalaiassistants.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 underline hover:text-[#00B8D4]"
              >
                info@professionalaiassistants.com
              </a>
            </p>

            </div>
            <div className="footer-column">
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="list-none">
                <li className="mb-2"><Link to="/privacy-policy" className="text-[#bbb] hover:text-white">Privacy Policy</Link></li>
                <li className="mb-2"><Link to="/terms-of-service" className="text-[#bbb] hover:text-white">Terms of Service</Link></li>
                <li className="mb-2"><Link to="/cookie-policy" className="text-[#bbb] hover:text-white">Cookie Policy</Link></li>
                <li><Link to="/gdpr-compliance" className="text-[#bbb] hover:text-white">GDPR Compliance</Link></li>
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
