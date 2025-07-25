import { useState, useEffect } from 'react';
import ROICalculator from './ROICalculator';

const HomeHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    company: '',
    website: '',
    phone: '',
    email: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    try {
      // Replace with your n8n webhook URL
      await fetch('https://YOUR-N8N-WEBHOOK-URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSuccess(true);
      setForm({ company: '', website: '', phone: '', email: '' });
    } catch {
      setSuccess(false);
    }
    setSubmitting(false);
  };

  return (
    <section className="hero py-20 bg-gradient-to-br from-white to-[#E3F2FD] pb-1 pt-0">
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
              href="/order" 
              className="hero-btn bg-[#1A237E] text-white px-6 py-3 rounded font-bold transition-all transform hover:bg-[#141c64] hover:scale-105 text-lg"
            >
              Start Your 14-Day Trial
            </a>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="hero-demo flex items-center text-[#1A237E] font-bold transition-transform hover:translate-x-2 border-2 border-blue-500 rounded px-4 py-2"
            >
              <svg width={24} height={24} fill="none" stroke="#1A237E" strokeWidth={2} className="mr-2">
                <circle cx={12} cy={12} r={10} strokeWidth={2}/>
                <path d="M16 12L10 16V8L16 12Z" fill="#1A237E"/>
              </svg>
              Live Demo
            </button>
          </div>
        </div>
        <div className={`hero-image w-full md:w-1/2 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          <img
            src="/lovable-uploads/img/Homepage1.png" 
            alt="AI Phone Receptionist in Action" 
            className="w-full rounded-lg "
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
                src="/lovable-uploads/img/logo/updatedlogo1.png"
                alt="Professional AI Assistants"
                className="h-10 mx-auto mb-4"
                style={{ width: 'auto', height: '2.5rem' }}
              />
            <h2 className="text-2xl font-bold mb-4 text-[#1A237E] text-center">Request a Live Demo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="company">Company Name</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Name of your Company"
                  required
                  value={form.company}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="website">Website URL</label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="(ex. https://yourcompany.com)"
                  required
                  value={form.website}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(ex. +1 234 567 8900)"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="(ex. john.doe@example.com)"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#1A237E] text-white py-2 rounded font-bold hover:bg-[#141c64] transition"
              >
                {submitting ? 'Submitting...' : 'Request Demo'}
              </button>
              {success && (
                <div className="text-green-600 text-center mt-2">Request sent! We'll be in touch soon.</div>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeHeroSection;
