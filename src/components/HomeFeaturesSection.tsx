const HomeFeaturesSection = () => (
  <section id="features" className="features bg-white py-24">
    <div className="container max-w-[1200px] mx-auto px-5">
      <div className="section-header text-center mb-20">
        <h2 className="text-3xl md:text-4xl text-[#1A237E] font-bold mb-3">Key Features of Your AI Phone Receptionist</h2>
        <p className="text-lg text-[#666] max-w-2xl mx-auto">Designed to handle your business calls with professionalism and efficiency.</p>
      </div>
      <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="feature-card bg-[#F5F5F5] rounded-lg p-8 transition-transform hover:translate-y-[-5px] hover:shadow-lg">
          <div className="feature-icon w-15 h-15 bg-[#FFF9C4] rounded-full flex items-center justify-center mb-5">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6V12L16 14" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="12" r="9" stroke="#1A237E" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">24/7 Availability</h3>
          <p className="text-gray-700">Never miss a call with round-the-clock coverage, even on holidays and weekends.</p>
        </div>
        <div className="feature-card bg-[#F5F5F5] rounded-lg p-8 transition-transform hover:translate-y-[-5px] hover:shadow-lg">
          <div className="feature-icon w-15 h-15 bg-[#FFF9C4] rounded-full flex items-center justify-center mb-5">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 11L11 13L15 9" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 3H17.4C18.8359 3 19.5544 3 20.0963 3.22836C20.5765 3.42914 20.9709 3.7636 21.2114 4.19621C21.48 4.67717 21.48 5.32294 21.48 6.61447V17.3855C21.48 18.6771 21.48 19.3228 21.2114 19.8038C20.9709 20.2364 20.5765 20.5709 20.0963 20.7716C19.5544 21 18.8359 21 17.4 21H6.6C5.16406 21 4.44609 21 3.90412 20.7716C3.42343 20.5709 3.02915 20.2364 2.78865 19.8038C2.52 19.3228 2.52 18.6771 2.52 17.3855V8.4M2.52 8.4V6.61447C2.52 5.32294 2.52 4.67717 2.78865 4.19621C3.02915 3.7636 3.42343 3.42914 3.90412 3.22836C4.44609 3 5.16406 3 6.6 3H8.4L2.52 8.4Z" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">Intelligent Call Routing</h3>
          <p className="text-gray-700">Direct calls to the right department or person based on caller needs and your business rules.</p>
        </div>
        <div className="feature-card bg-[#F5F5F5] rounded-lg p-8 transition-transform hover:translate-y-[-5px] hover:shadow-lg">
          <div className="feature-icon w-15 h-15 bg-[#FFF9C4] rounded-full flex items-center justify-center mb-5">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#1A237E" strokeWidth="2" />
              <path d="M20 20C20 16.6863 16.4183 14 12 14C7.58172 14 4 16.6863 4 20" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">Natural Conversations</h3>
          <p className="text-gray-700">Human-like interactions that make callers feel heard and valued, not like they're talking to a bot.</p>
        </div>
        <div className="feature-card bg-[#F5F5F5] rounded-lg p-8 transition-transform hover:translate-y-[-5px] hover:shadow-lg">
          <div className="feature-icon w-15 h-15 bg-[#FFF9C4] rounded-full flex items-center justify-center mb-5">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8L8 16M8 8L16 16" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="12" r="9" stroke="#1A237E" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">Professional Message Taking</h3>
          <p className="text-gray-700">Accurate message recording with details delivered to your team via email or SMS in real-time.</p>
        </div>
        <div className="feature-card bg-[#F5F5F5] rounded-lg p-8 transition-transform hover:translate-y-[-5px] hover:shadow-lg">
          <div className="feature-icon w-15 h-15 bg-[#FFF9C4] rounded-full flex items-center justify-center mb-5">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 3H11C6.02944 3 2 7.02944 2 12C2 16.9706 6.02944 21 11 21H13C17.9706 21 22 16.9706 22 12C22 7.02944 17.9706 3 13 3Z" stroke="#1A237E" strokeWidth="2" />
              <path d="M12 8V16M16 12H8" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">Customizable Scripts</h3>
          <p className="text-gray-700">Tailor your AI receptionist's responses to match your brand voice and handle specific scenarios.</p>
        </div>
        <div className="feature-card bg-[#F5F5F5] rounded-lg p-8 transition-transform hover:translate-y-[-5px] hover:shadow-lg">
          <div className="feature-icon w-15 h-15 bg-[#FFF9C4] rounded-full flex items-center justify-center mb-5">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 11L11 13L15 9" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="9" stroke="#1A237E" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">Call Analytics Dashboard</h3>
          <p className="text-gray-700">Get insights into call volume, peak times, common inquiries, and customer satisfaction.</p>
        </div>
      </div>
    </div>
  </section>
);
export default HomeFeaturesSection;
