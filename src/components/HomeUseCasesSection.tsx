const HomeUseCasesSection = () => (
  <section id="use-cases" className="use-cases bg-[#F5F5F5] py-24">
    <div className="container max-w-[1200px] mx-auto px-5">
      <div className="section-header text-center mb-20">
        <h2 className="text-3xl font-bold text-[#1A237E] mb-5">Perfect For These Business Types</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">See how our AI phone receptionist is helping businesses across industries.</p>
      </div>
      <div className="use-cases-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <div className="use-case-card bg-white rounded-lg p-8 shadow-md transition-transform hover:translate-y-[-5px]">
          <div className="use-case-icon w-15 h-15 bg-[#E3F2FD] rounded-full flex items-center justify-center mb-5">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 8L17 3H7L5 8" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 8H22V16C22 18.2091 20.2091 20 18 20H6C3.79086 20 2 18.2091 2 16V8Z" stroke="#1A237E" strokeWidth="2" />
              <path d="M12 12C12 10.8954 12.8954 10 14 10C15.1046 10 16 10.8954 16 12C16 13.1046 15.1046 14 14 14H10C8.89543 14 8 13.1046 8 12C8 10.8954 8.89543 10 10 10C11.1046 10 12 10.8954 12 12Z" stroke="#1A237E" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">Professional Services</h3>
          <p className="text-gray-700">Law firms, accounting offices, and consultancies that need to capture every potential client call without interrupting important client work.</p>
        </div>
        <div className="use-case-card bg-white rounded-lg p-8 shadow-md transition-transform hover:translate-y-[-5px]">
          <div className="use-case-icon w-15 h-15 bg-[#E3F2FD] rounded-full flex items-center justify-center mb-5">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5H21V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5Z" stroke="#1A237E" strokeWidth="2" />
              <path d="M3 5V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V5" stroke="#1A237E" strokeWidth="2" />
              <path d="M9 12L11 14L15 10" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">Medical Practices</h3>
          <p className="text-gray-700">Doctors, dentists, and therapists who need to manage appointments and emergencies while providing attentive patient care.</p>
        </div>
        <div className="use-case-card bg-white rounded-lg p-8 shadow-md transition-transform hover:translate-y-[-5px]">
          <div className="use-case-icon w-15 h-15 bg-[#E3F2FD] rounded-full flex items-center justify-center mb-5">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V21L12 17L3 21Z" stroke="#1A237E" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">Real Estate Offices</h3>
          <p className="text-gray-700">Property management companies and real estate agents who need to capture leads and handle tenant inquiries while showing properties.</p>
        </div>
        <div className="use-case-card bg-white rounded-lg p-8 shadow-md transition-transform hover:translate-y-[-5px]">
          <div className="use-case-icon w-15 h-15 bg-[#E3F2FD] rounded-full flex items-center justify-center mb-5">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 3L17 5L21 9L9 21H5V17L15 7V3Z" stroke="#1A237E" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">Small Businesses</h3>
          <p className="text-gray-700">Retailers, service providers, and entrepreneurs who can't afford to hire a full-time receptionist but need professional call handling.</p>
        </div>
        <div className="use-case-card bg-white rounded-lg p-8 shadow-md transition-transform hover:translate-y-[-5px]">
          <div className="use-case-icon w-15 h-15 bg-[#E3F2FD] rounded-full flex items-center justify-center mb-5">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V5C20 3.89543 19.1046 3 18 3H6C4.89543 3 4 3.89543 4 5V21" stroke="#1A237E" strokeWidth="2" />
              <path d="M2 21H22" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 8H16" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 13H16" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">E-commerce Businesses</h3>
          <p className="text-gray-700">Online retailers who need to provide human-like customer service and order support without the overhead of call center staff.</p>
        </div>
        <div className="use-case-card bg-white rounded-lg p-8 shadow-md transition-transform hover:translate-y-[-5px]">
          <div className="use-case-icon w-15 h-15 bg-[#E3F2FD] rounded-full flex items-center justify-center mb-5">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 6L3 6" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" />
              <path d="M21 12L3 12" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" />
              <path d="M21 18L3 18" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">Home Service Providers</h3>
          <p className="text-gray-700">Plumbers, electricians, and contractors who need to capture service calls while they're working on job sites.</p>
        </div>
      </div>
    </div>
  </section>
);
export default HomeUseCasesSection;
