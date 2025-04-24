
const HomeHeroSection = () => (
  <section className="hero py-20 bg-gradient-to-br from-white to-[#E3F2FD]">
    <div className="container max-w-[1200px] mx-auto px-5 flex flex-col md:flex-row items-center justify-between">
      <div className="hero-content mb-10 md:mb-0 max-w-xl z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A237E] mb-6">AI Phone Receptionist</h1>
        <p className="text-lg md:text-xl text-[#555] mb-8">
          Your professionally trained virtual receptionist that handles calls 24/7, routes inquiries, and provides consistent customer service – always on, never a sick day.
        </p>
        <div className="price-tag bg-[#00B8D4] text-white px-5 py-1 rounded-full font-bold text-2xl mb-5 inline-block">
          $0.47<span className="text-base ml-2">/hour</span>
        </div>
        <div className="hero-cta flex flex-wrap items-center gap-6">
          <a href="#" className="hero-btn bg-[#1A237E] text-white px-6 py-3 rounded font-bold transition hover:bg-[#141c64] text-lg">Start Your 14-Day Trial</a>
          <a href="#" className="hero-demo flex items-center text-[#1A237E] font-bold">
            <svg width={24} height={24} fill="none" stroke="#1A237E" strokeWidth={2} className="mr-2"><circle cx={12} cy={12} r={10} strokeWidth={2}/><path d="M16 12L10 16V8L16 12Z" fill="#1A237E"/></svg>
            Live Demo
          </a>
        </div>
      </div>
      <div className="hero-image w-full md:w-1/2">
        <img src="/api/placeholder/500/350" alt="AI Phone Receptionist in Action" className="w-full rounded-lg shadow-lg" />
      </div>
    </div>
  </section>
);

export default HomeHeroSection;
