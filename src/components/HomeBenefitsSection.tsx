import React from "react";

const HomeBenefitsSection = () => (
  <section id="benefits" className="benefits bg-[#F5F5F5] py-24">
    <div className="container max-w-[1200px] mx-auto px-5">
      <div className="benefits-container flex flex-wrap items-center justify-between">
        <div className="benefits-content flex-basis-48">
          <h2 className="text-3xl font-bold text-[#1A237E] mb-5">Business Benefits That Impact Your Bottom Line</h2>
          <ul className="benefits-list list-none">
            <li className="mb-4 relative pl-8 before:content-['✓'] before:absolute before:left-0 before:text-[#00B8D4] before:font-bold">
              <strong>Cost Effective:</strong> Save up to 70% compared to a human receptionist, with no benefits, sick days, or vacation time to manage.
            </li>
            <li className="mb-4 relative pl-8 before:content-['✓'] before:absolute before:left-0 before:text-[#00B8D4] before:font-bold">
              <strong>Improved Customer Experience:</strong> Never miss a call and ensure every client interaction starts professionally, increasing satisfaction and retention.
            </li>
            <li className="mb-4 relative pl-8 before:content-['✓'] before:absolute before:left-0 before:text-[#00B8D4] before:font-bold">
              <strong>Enhanced Productivity:</strong> Free up your team from answering routine calls so they can focus on high-value tasks.
            </li>
            <li className="mb-4 relative pl-8 before:content-['✓'] before:absolute before:left-0 before:text-[#00B8D4] before:font-bold">
              <strong>Scalability:</strong> Handle call volume surges without stress or additional cost, whether it's 10 calls or 100.
            </li>
            <li className="mb-4 relative pl-8 before:content-['✓'] before:absolute before:left-0 before:text-[#00B8D4] before:font-bold">
              <strong>Data-Driven Insights:</strong> Get actionable information about customer inquiries to improve your business operations.
            </li>
            <li className="mb-4 relative pl-8 before:content-['✓'] before:absolute before:left-0 before:text-[#00B8D4] before:font-bold">
              <strong>Consistent Professionalism:</strong> Maintain the same high standard of service throughout every call, regardless of time or date.
            </li>
            <li className="mb-4 relative pl-8 before:content-['✓'] before:absolute before:left-0 before:text-[#00B8D4] before:font-bold">
              <strong>Multi-language Support:</strong> Communicate with international clients in their preferred language without additional staffing.
            </li>
          </ul>
        </div>
        <div className="benefits-image flex-basis-48">
          <img src="/api/placeholder/500/400" alt="Business Benefits of AI Receptionist" className="rounded-lg" />
        </div>
      </div>
    </div>
  </section>
);

export default HomeBenefitsSection;
