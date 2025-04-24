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
          <h4 className="font-bold text-lg mb-4">Follow Us</h4>
          <div className="social-links flex gap-4">
            <a href="#" className="text-[#bbb] hover:text-[#00B8D4]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 2H15C13.8954 2 13 2.89543 13 4V7H10V10H13V22H16V10H18L19 7H16V4C16 3.44772 16.4477 3 17 3H18V2Z" fill="currentColor"/></svg>
            </a>
            <a href="#" className="text-[#bbb] hover:text-[#00B8D4]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 5.115C21.263 5.449 20.479 5.683 19.66 5.82C20.504 5.314 21.169 4.483 21.469 3.528C20.676 4.003 19.792 4.342 18.847 4.518C18.108 3.724 17.199 3.24 16.173 3.166C15.147 3.093 14.136 3.44 13.286 4.122C12.437 4.804 11.824 5.768 11.597 6.847C9.426 6.749 7.332 5.897 5.666 4.32C5.054 4.429 4.454 4.674 3.891 5.043C3.328 5.412 2.816 5.906 2.386 6.494C2.197 7.425 2.545 8.423 3.281 9.111C2.697 9.091 2.12 8.924 1.584 8.61C1.584 8.624 1.584 8.638 1.584 8.652C1.584 9.95 2.489 11.059 3.727 11.331C3.186 11.479 2.619 11.534 2.059 11.408C2.32 12.49 3.093 13.368 4.123 13.621C3.34 13.779 2.53 13.76 1.754 13.564C2.017 14.664 2.931 15.51 4.076 15.74C3.288 16.35 2.356 16.734 1.371 16.843C1.182 17.774 1.53 18.772 2.266 19.46C3.002 20.148 3.986 20.496 5.065 20.422C11.544 20.422 16.012 15.043 16.012 9.053C16.012 8.839 16.005 8.624 15.991 8.41C16.793 7.824 17.464 7.077 17.977 6.22C18.742 5.24 19.676 4.441 20.724 3.861C21.772 3.281 22.906 3.035 24.002 3.133C22.884 3.989 21.842 4.686 20.89 5.223C22.008 4.185 23.284 3.36 24.652 2.78C23.49 3.834 22.448 4.695 21.531 5.347C22 5.115 22 5.115 22 5.115Z" fill="currentColor"/></svg>
            </a>
            <a href="#" className="text-[#bbb] hover:text-[#00B8D4]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM14.029 14.414C14.029 13.63 13.401 13 0.714 13C13.401 13 14.029 12.37 14.029 11.586C14.029 10.801 13.401 10 0.714 10C13.401 10 14.029 9.199 14.029 8.414C14.029 7.63 13.401 7 0.714 7C10.87 7 9.286 8.586 9.286 10.414V13.586C9.286 15.414 10.87 17 0.714 17C13.401 17 14.029 16.37 14.029 15.586C14.029 14.801 13.401 14 0.714 14H14.029Z" fill="currentColor"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom text-center pt-10 text-[#bbb] text-sm">
      &copy; 2025 Professional AI Assistants. All rights reserved.
    </div>
  </footer>
);

export default BlogFooter;
