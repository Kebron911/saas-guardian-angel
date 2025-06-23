
import React from "react";
import { useCalculator } from "@/contexts/CalculatorContext";

// Industry mapping to the sections in INDUSTRY_DETAILS
const getIndustryMapping = (industry: string) => {
  switch(industry) {
    case 'dental': return 'healthcare';
    case 'hvac': return 'home_services';
    case 'law': return 'legal_financial';
    case 'automotive': return 'automotive';
    case 'tech': return 'it_tech';
    case 'hospitality': return 'hospitality_travel';
    case 'food': return 'food_beverage';
    case 'education': return 'education_community';
    default: return 'other';
  }
};

// Customer term table by industry ID
const INDUSTRY_DETAILS: Record<
  string,
  {
    customerTerm: string;
    groupLabel: string;
    beforePoints: string[];
    afterPoints: string[];
    accent: string;
  }
> = {
  healthcare: {
    customerTerm: "Patients",
    groupLabel: "Healthcare & Medical",
    beforePoints: [
      "Patient inquiries go unanswered after hours",
      "Voicemails pile up; urgent needs delayed",
      "Front desk juggles appointments, insurance & calls",
      "Missed bookings and lost patient trust",
    ],
    afterPoints: [
      "Every patient call answered 24/7—even emergencies",
      "No more bottlenecks: voicemails instantly resolved",
      "Staff focus on in-person care, not the phones",
      "Higher retention, more booked appointments",
    ],
    accent: "text-blue-700",
  },
  home_services: {
    customerTerm: "Customers",
    groupLabel: "Home & Trade Services",
    beforePoints: [
      "Missed emergency calls after hours",
      "Potential customers book with the next business",
      "Staff answering calls while working on-site",
      "Lost jobs and wasted marketing dollars",
    ],
    afterPoints: [
      "All service calls answered instantly",
      "Emergencies routed fast to your techs",
      "More time on jobs, less phone tag",
      "Fuller schedule, more repeat business",
    ],
    accent: "text-orange-700",
  },
  legal_financial: {
    customerTerm: "Clients",
    groupLabel: "Legal & Financial Services",
    beforePoints: [
      "Client calls missed—leads go to competitors",
      "Important consults delayed or lost",
      "Attorneys/advisors distracted by phone intake",
      "Missed billable hours and lost revenue",
    ],
    afterPoints: [
      "Every client inquiry routed 24/7",
      "Consultations and bookings never missed",
      "More focus on client work, less call screening",
      "Land high-value cases and clients",
    ],
    accent: "text-green-700",
  },
  real_estate: {
    customerTerm: "Clients",
    groupLabel: "Real Estate & Property Services",
    beforePoints: [
      "Showings and buyer/seller calls go to voicemail",
      "Slow response loses deals to faster agents",
      "Agents constantly interrupted by phone",
      "Lost commissions from missed opportunities",
    ],
    afterPoints: [
      "All inquiries answered & directed instantly",
      "Responsive follow-up on every showing",
      "More time spent with clients, less on the phone",
      "Win more listings and close more sales",
    ],
    accent: "text-cyan-700",
  },
  automotive: {
    customerTerm: "Customers",
    groupLabel: "Automotive Services",
    beforePoints: [
      "Missed calls mean lost service bookings",
      "Customers go elsewhere for repairs or test-drives",
      "Team split between phone & front desk",
      "Empty service bays and slow sales",
    ],
    afterPoints: [
      "Every auto inquiry answered right away",
      "Bookings & appointments handled seamlessly",
      "Staff focus on customers, not busy phones",
      "Higher utilization, boosted revenue",
    ],
    accent: "text-red-700",
  },
  it_tech: {
    customerTerm: "Clients",
    groupLabel: "IT & Tech Support",
    beforePoints: [
      "Support requests slip through after hours",
      "New business leads go unanswered",
      "Techs distracted by support calls mid-task",
      "Missed contracts & project delays",
    ],
    afterPoints: [
      "All support calls handled 24/7",
      "Leads routed to the right team instantly",
      "Team works ticket-free, no constant interruptions",
      "Secure more clients, win more contracts",
    ],
    accent: "text-purple-700",
  },
  hospitality_travel: {
    customerTerm: "Guests",
    groupLabel: "Hospitality, Travel & Leisure",
    beforePoints: [
      "Guest calls missed for bookings & requests",
      "Inquiries go unanswered during busy times",
      "Team multi-tasking—slower guest service",
      "Empty rooms & missed upsell opportunities",
    ],
    afterPoints: [
      "Guests get instant answers, any hour",
      "Bookings & special requests never missed",
      "Staff give all attention to present guests",
      "Higher occupancy & boosted reviews",
    ],
    accent: "text-teal-700",
  },
  food_beverage: {
    customerTerm: "Customers",
    groupLabel: "Food & Beverage",
    beforePoints: [
      "Call-in orders, reservations missed during rush",
      "Customers frustrated by busy lines",
      "Staff juggling service & phone calls",
      "Lost revenue from unseated tables",
    ],
    afterPoints: [
      "Orders and reservations answered at once",
      "No busy signals—every customer is heard",
      "Servers & staff focused on guests, not the phone",
      "Fuller tables and more profit per shift",
    ],
    accent: "text-pink-700",
  },
  education_community: {
    customerTerm: "Students",
    groupLabel: "Education & Community Services",
    beforePoints: [
      "Parent/student inquiries go unanswered",
      "Enrollment calls missed outside hours",
      "Teachers and admins distracted by phone",
      "Lost enrollments & frustrated families",
    ],
    afterPoints: [
      "All questions answered—any time of day",
      "Enrollment and info calls are never missed",
      "Staff focus on teaching, not phone tag",
      "Higher retention and better student experience",
    ],
    accent: "text-indigo-700",
  },
  other: {
    customerTerm: "Customers",
    groupLabel: "Other Services",
    beforePoints: [
      "Customer calls unanswered or go to voicemail",
      "Leads slip through the cracks after hours",
      "Staff interrupted from core tasks",
      "Potential revenue lost from missed calls",
    ],
    afterPoints: [
      "Every call picked up—no opportunities lost",
      "Inquiries followed up 24/7",
      "Team can focus on what matters most",
      "Higher conversion from every dollar spent",
    ],
    accent: "text-cyan-700",
  },
};

const BeforeAfterSnapshot: React.FC = () => {
  const { calculatorData } = useCalculator();
  // Map the industry to the correct section in INDUSTRY_DETAILS
  const mappedIndustry = getIndustryMapping(calculatorData?.industry || "other");
  const content = INDUSTRY_DETAILS[mappedIndustry] || INDUSTRY_DETAILS.other;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
      <h2 className="font-poppins font-bold text-2xl text-center mb-4">
        Your {content.customerTerm}'s Experience Before & After AI
      </h2>
      {/* New group/industry heading */}
      <h3 className={`font-inter font-semibold text-lg text-center mb-6 ${content.accent}`}>
        {content.groupLabel}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-red-200 rounded-lg p-5 bg-red-50">
          <h3 className="font-inter font-bold text-xl mb-3 text-red-700">
            Before AI Receptionist
          </h3>
          <ul className="space-y-3 text-gray-800">
            {content.beforePoints.map((point, i) => (
              <li className="flex items-start gap-2" key={i}>
                <span className="text-red-500 font-bold">✗</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-green-200 rounded-lg p-5 bg-green-50">
          <h3 className="font-inter font-bold text-xl mb-3 text-green-700">
            After AI Receptionist
          </h3>
          <ul className="space-y-3 text-gray-800">
            {content.afterPoints.map((point, i) => (
              <li className="flex items-start gap-2" key={i}>
                <span className="text-green-500 font-bold">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSnapshot;

