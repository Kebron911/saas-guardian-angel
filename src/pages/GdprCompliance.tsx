
import React from "react";
import { Layout, LayoutContent } from "@/components/ui/layout";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const GdprCompliance = () => {
  return (
    <Layout>
      <LayoutContent className="pt-[100px]">
        <div className="container max-w-4xl mx-auto px-5 py-12">
          <Link to="/" className="text-[#1A237E] hover:underline mb-6 inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>
            Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#1A237E]">GDPR Compliance</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-4">Last Updated: May 1, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment to GDPR</h2>
            <p>Professional AI Assistants is committed to ensuring the security and protection of the personal information that we process, and to provide a compliant and consistent approach to data protection. We have always had a robust and effective data protection program in place which complies with existing law and abides by the data protection principles.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Comply with GDPR</h2>
            <p>We recognize that the GDPR imposes additional obligations on organizations that process EU personal data. To meet these requirements, we have implemented the following measures:</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">1. Data Protection Officer</h3>
            <p>We have appointed a Data Protection Officer (DPO) who is responsible for overseeing our data protection strategy and its implementation to ensure compliance with GDPR requirements.</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">2. Data Protection Impact Assessments</h3>
            <p>We carry out Data Protection Impact Assessments (DPIAs) for processing operations that present specific risks to the rights and freedoms of individuals.</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">3. Consent</h3>
            <p>We have reviewed our consent mechanisms to ensure that we are using clear, specific, and explicit opt-in consent where required. We maintain records of consent given by data subjects.</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">4. Data Subject Rights</h3>
            <p>We have established procedures to ensure that we can promptly respond to requests from individuals to exercise their rights under the GDPR, including:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Right to access their personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Rights related to automated decision making and profiling</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">5. Data Breach Notification</h3>
            <p>We have implemented procedures to detect, report, and investigate personal data breaches. In case of a breach that poses a risk to the rights and freedoms of individuals, we will notify the relevant supervisory authority within 72 hours of becoming aware of it, and affected individuals without undue delay.</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">6. International Data Transfers</h3>
            <p>We ensure appropriate safeguards are in place when transferring personal data outside the European Economic Area.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">EU Representative</h2>
            <p>In compliance with Article 27 of the GDPR, we have appointed an EU representative:</p>
            <p>EU Representative Name<br />
            Address Line 1<br />
            Address Line 2<br />
            Email: eu-representative@example.com</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>For any GDPR-related inquiries or to exercise your rights under GDPR, please contact our Data Protection Officer:</p>
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

export default GdprCompliance;
