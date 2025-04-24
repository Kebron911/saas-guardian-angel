
const LandingFooter = () => (
  <footer className="bg-[#333] text-white py-16">
    <div className="container max-w-[1200px] mx-auto px-5">
      <div className="footer-columns flex flex-wrap justify-between">
        <div className="footer-column flex-basis-30 mb-8">
          <h3 className="font-bold text-lg mb-4">About Us</h3>
          <p className="text-[#bbb]">We are dedicated to providing cutting-edge AI solutions that transform the way businesses operate and serve their customers.</p>
        </div>
        <div className="footer-column flex-basis-20 mb-8">
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="list-none">
            <li className="mb-2"><a href="#features" className="text-[#bbb] hover:text-white">Features</a></li>
            <li className="mb-2"><a href="#benefits" className="text-[#bbb] hover:text-white">Benefits</a></li>
            <li className="mb-2"><a href="#how-it-works" className="text-[#bbb] hover:text-white">How It Works</a></li>
            <li className="mb-2"><a href="#use-cases" className="text-[#bbb] hover:text-white">Use Cases</a></li>
            <li><a href="#faq" className="text-[#bbb] hover:text-white">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-column flex-basis-30 mb-8">
          <h3 className="font-bold text-lg mb-4">Contact Us</h3>
          <p className="text-[#bbb] mb-2">123 AI Innovation Way<br />Tech City, CA 91234</p>
          <p className="text-[#bbb] mb-2">Email: info@example.com<br />Phone: (555) 123-4567</p>
        </div>
      </div>
      <div className="social-links flex justify-center mt-8">
        <a href="#" className="social-icon w-10 h-10 rounded-full bg-[#555] text-white inline-flex items-center justify-center mr-3 hover:bg-[#00B8D4]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 2H15C13.7913 2 12.6174 2.47492 11.6716 3.32233C10.7258 4.16975 10.1361 5.26148 10 6.5V9H7V12H10V22H14V12H17L18 9H14V7C14 6.44772 14.4477 6 15 6H18V2Z" fill="currentColor" />
          </svg>
        </a>
        <a href="#" className="social-icon w-10 h-10 rounded-full bg-[#555] text-white inline-flex items-center justify-center mr-3 hover:bg-[#00B8D4]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22 5.115C21.247 5.457 20.451 5.692 19.621 5.828C20.472 5.319 21.146 4.598 21.534 3.73C20.729 4.205 19.842 4.552 18.893 4.766C18.119 4.024 17.177 3.585 16.144 3.49C15.112 3.395 14.106 3.645 13.228 4.203C12.35 4.761 11.644 5.575 11.285 6.53C9.961 6.461 8.67 6.044 7.48 5.305C6.289 4.566 5.241 3.534 4.38 2.358C4.38 2.358 4.075 3.029 4.075 3.029C4.075 3.029 4.075 3.097 4.075 3.097C4.075 3.097 4.271 3.476 4.271 3.476C4.271 3.476 4.424 3.777 4.424 3.777C4.424 3.777 4.749 4.219 4.749 4.219C5.017 5.011 5.573 5.644 6.276 6.044C5.645 6.025 5.042 5.834 4.496 5.5C4.496 5.5 4.496 5.5 4.496 5.5" fill="currentColor" />
          </svg>
        </a>
      </div>
    </div>
  </footer>
);

export default LandingFooter;
