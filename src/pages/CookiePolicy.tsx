
import React from "react";
import { Layout, LayoutContent } from "@/components/ui/layout";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
  return (
    <Layout>
      <LayoutContent className="pt-[100px]">
        <div className="container max-w-4xl mx-auto px-5 py-12">
          <Link to="/" className="text-[#1A237E] hover:underline mb-6 inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>
            Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#1A237E]">Cookie Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-4">Last Updated: May 1, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">What Are Cookies</h2>
            <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to recognize your device and remember if you have been to the website before. Cookies are a very common web technology; most websites use cookies and have done so for years. Cookies are widely used to make the website work more efficiently, as well as to provide information to the owners of the website.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Cookies</h2>
            <p>Professional AI Assistants uses cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our website. Third parties may also serve cookies through our website for advertising, analytics and other purposes.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Types of Cookies We Use</h2>
            <p>The types of cookies we use on our website include:</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">1. Essential Cookies</h3>
            <p>These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">2. Performance and Functionality Cookies</h3>
            <p>These cookies are used to enhance the performance and functionality of our website but are non-essential to its use. However, without these cookies, certain functionality may become unavailable.</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">3. Analytics and Customization Cookies</h3>
            <p>These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you in order to enhance your experience.</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">4. Targeting Cookies</h3>
            <p>These cookies are used to make advertising messages more relevant to you and your interests. They also perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">How to Control and Delete Cookies</h2>
            <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.</p>
            
            <p>Find out how to manage cookies on popular browsers:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><a href="https://support.google.com/accounts/answer/61416" className="text-[#1A237E] hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-[#1A237E] hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" className="text-[#1A237E] hover:underline">Microsoft Edge</a></li>
              <li><a href="https://support.apple.com/en-us/HT201265" className="text-[#1A237E] hover:underline">Safari (Desktop)</a></li>
              <li><a href="https://support.apple.com/en-us/HT201265" className="text-[#1A237E] hover:underline">Safari (Mobile)</a></li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to Our Cookie Policy</h2>
            <p>We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date at the top of this Cookie Policy.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>If you have any questions about our Cookie Policy, please contact us:</p>
            <p>Email: privacy@example.com</p>
            <p>Postal address: 123 AI Innovation Way, Tech City, CA 91234</p>
          </div>
        </div>
      </LayoutContent>
      <Footer />
    </Layout>
  );
};

export default CookiePolicy;
