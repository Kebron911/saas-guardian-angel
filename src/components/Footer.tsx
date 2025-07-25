import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="py-8 text-center text-gray-500 bg-white mt-10">
    <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <span className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} AssistAI. All rights reserved.</span>
      <div className="space-x-3">
        <a href="https://github.com/ProfessionalAIAssistants/SaaS/" className="hover:text-purple-600 transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="/features" className="hover:text-purple-600 transition-colors">Features</a>
        <a href="/pricing" className="hover:text-purple-600 transition-colors">Pricing</a>
        <Link to="/privacy-policy" className="hover:text-purple-600 transition-colors">Privacy</Link>
        <Link to="/terms-of-service" className="hover:text-purple-600 transition-colors">Terms</Link>
        <Link to="/cookie-policy" className="hover:text-purple-600 transition-colors">Cookies</Link>
        <Link to="/gdpr-compliance" className="hover:text-purple-600 transition-colors">GDPR</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
