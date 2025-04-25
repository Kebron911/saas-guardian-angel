
import { useState, useEffect } from 'react';
import ROICalculator from './ROICalculator';

const HomeHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero py-20 bg-gradient-to-br from-white to-[#E3F2FD]">
      <div className="container max-w-[1200px] mx-auto px-5 flex flex-col md:flex-row items-center justify-between">
        <div className={`hero-content mb-10 md:mb-0 max-w-xl z-10 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A237E] mb-6">
            AI Phone Receptionist
          </h1>
          <p className="text-lg md:text-xl text-[#555] mb-8 leading-relaxed">
            Your professionally trained virtual receptionist that handles calls 24/7, routes inquiries, and provides consistent customer service – always on, never a sick day.
          </p>
          <ROICalculator />
          <div className="hero-cta flex flex-wrap items-center gap-6 mt-8">
            <a 
              href="#" 
              className="hero-btn bg-[#1A237E] text-white px-6 py-3 rounded font-bold transition-all transform hover:bg-[#141c64] hover:scale-105 text-lg"
            >
              Start Your 14-Day Trial
            </a>
            <a 
              href="#" 
              className="hero-demo flex items-center text-[#1A237E] font-bold transition-transform hover:translate-x-2"
            >
              <svg width={24} height={24} fill="none" stroke="#1A237E" strokeWidth={2} className="mr-2">
                <circle cx={12} cy={12} r={10} strokeWidth={2}/>
                <path d="M16 12L10 16V8L16 12Z" fill="#1A237E"/>
              </svg>
              Live Demo
            </a>
          </div>
        </div>
        <div className={`hero-image w-full md:w-1/2 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          <img 
            src="/lovable-uploads/332ae568-86d8-4c46-ac45-7a8c67c76215.png" 
            alt="AI Phone Receptionist in Action" 
            className="w-full rounded-lg shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
