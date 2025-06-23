
import { Link } from "react-router-dom";

const BlogFooter = () => (
  <footer className="bg-[#333] text-white py-16">
    <div className="container max-w-[1200px] mx-auto px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="footer-section">
          <h4 className="font-bold text-lg mb-4">About Us</h4>
          <p className="text-[#bbb]">We are dedicated to revolutionizing business communication with cutting-edge AI solutions.</p>
        </div>
        <div className="footer-section">
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="list-none">
            <li className="mb-2"><a href="/#features" className="text-[#bbb] hover:text-[#00B8D4]">Features</a></li>
            <li className="mb-2"><a href="/#pricing" className="text-[#bbb] hover:text-[#00B8D4]">Pricing</a></li>
            <li className="mb-2"><a href="/blog" className="text-[#bbb] hover:text-[#00B8D4]">Blog</a></li>
            <li className="mb-2"><a href="/#contact" className="text-[#bbb] hover:text-[#00B8D4]">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="font-bold text-lg mb-4">Services</h4>
          <ul className="list-none">
            <li className="mb-2"><a href="#" className="text-[#bbb] hover:text-[#00B8D4]">AI Phone Receptionist</a></li>
            <li className="mb-2"><a href="#" className="text-[#bbb] hover:text-[#00B8D4]">Customer Support AI</a></li>
            <li className="mb-2"><a href="#" className="text-[#bbb] hover:text-[#00B8D4]">Sales AI Assistant</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="font-bold text-lg mb-4">Legal</h4>
          <ul className="list-none">
            <li className="mb-2"><Link to="/privacy-policy" className="text-[#bbb] hover:text-[#00B8D4]">Privacy Policy</Link></li>
            <li className="mb-2"><Link to="/terms-of-service" className="text-[#bbb] hover:text-[#00B8D4]">Terms of Service</Link></li>
            <li className="mb-2"><Link to="/cookie-policy" className="text-[#bbb] hover:text-[#00B8D4]">Cookie Policy</Link></li>
            <li className="mb-2"><Link to="/gdpr-compliance" className="text-[#bbb] hover:text-[#00B8D4]">GDPR Compliance</Link></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-bottom text-center pt-10 text-[#bbb] text-sm">
      &copy; 2025 Professional AI Assistants. All rights reserved.
    </div>
  </footer>
);

export default BlogFooter;
