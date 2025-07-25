
import React from "react";
import { Layout, LayoutContent } from "@/components/ui/layout";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <Layout>
      <LayoutContent className="pt-[100px]">
        <div className="container max-w-4xl mx-auto px-5 py-12">
          <Link to="/" className="text-[#1A237E] hover:underline mb-6 inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>
            Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#1A237E]">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-4">Last Updated: May 1, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
            <p>These Terms of Service govern your use of Professional AI Assistants services and website located at example.com ("Service"). By using our Service, you agree to be bound by these Terms. If you don't agree to these Terms, please do not use the Service.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily use the Service for personal, business purposes only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose or for any public display;</li>
              <li>Attempt to reverse engineer any software contained on the Service;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
            <p>The materials on the Service are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations</h2>
            <p>In no event shall Professional AI Assistants or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Service, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Accuracy of Materials</h2>
            <p>The materials appearing on the Service could include technical, typographical, or photographic errors. We do not warrant that any of the materials on the Service are accurate, complete, or current. We may make changes to the materials contained on the Service at any time without notice.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Links</h2>
            <p>We have not reviewed all of the sites linked to the Service and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Modifications</h2>
            <p>We may revise these terms of service for the Service at any time without notice. By using this Service you are agreeing to be bound by the then current version of these terms of service.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of the State of California and you irrevocably submit to the exclusive jurisdiction of the courts in that State.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>
              Email:{" "}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@professionalaiassistants.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A237E] underline hover:text-[#00B8D4]"
              >
                info@professionalaiassistants.com
              </a>
            </p>
            <p>Postal address: 8269 Iron Horse Lake Point, UT 84074</p>
          </div>
        </div>
      </LayoutContent>
      <Footer />
    </Layout>
  );
};

export default TermsOfService;
