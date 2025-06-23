import React from "react";
import { useCalculator, Industry } from "@/contexts/CalculatorContext";
import {
  Hospital,
  House,
  Briefcase,
  Building2,
  Car,
  Computer,
  Hotel,
  Utensils,
  GraduationCap,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const INDUSTRIES: {
  id: Industry | "realEstate" | "other";
  label: string;
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    id: "dental",
    label: "Healthcare & Medical",
    icon: <Hospital size={24} />,
    description:
      "For medical practitioners, clinics, and dentistry managing appointments and patient inquiries.",
  },
  {
    id: "hvac",
    label: "Home & Trade Services",
    icon: <House size={24} />,
    description:
      "For plumbing, HVAC, electricians, landscapers, and other home/trade services.",
  },
  {
    id: "law",
    label: "Legal & Financial Services",
    icon: <Briefcase size={24} />,
    description:
      "For law firms, accounting, wealth advisors handling consults and client requests.",
  },
  {
    id: "realEstate",
    label: "Real Estate & Property Services",
    icon: <Building2 size={24} />,
    description:
      "For realtors, property managers, brokers handling showings and buyer/seller inquiries.",
  },
  {
    id: "automotive",
    label: "Automotive Services",
    icon: <Car size={24} />,
    description:
      "For auto repair, detailing, car dealerships managing appointments and test drives.",
  },
  {
    id: "tech",
    label: "IT & Tech Support",
    icon: <Computer size={24} />,
    description:
      "For tech support, MSPs, computer shops handling service tickets and support calls.",
  },
  {
    id: "hospitality",
    label: "Hospitality, Travel & Leisure",
    icon: <Hotel size={24} />,
    description:
      "For hotels, travel agencies, gyms, spas, and leisure services handling bookings and guest requests.",
  },
  {
    id: "food",
    label: "Food & Beverage",
    icon: <Utensils size={24} />,
    description:
      "For restaurants, cafes, catering, and event venues managing reservations and orders.",
  },
  {
    id: "education",
    label: "Education & Community Services",
    icon: <GraduationCap size={24} />,
    description:
      "For schools, tutors, training centers, community services handling enrollments and support.",
  },
  {
    id: "other",
    label: "Other Services",
    icon: <Building2 size={24} />,
    description:
      "For other service-based businesses not listed above, handling calls and inquiries.",
  },
];

const IndustryCard: React.FC<{
  industry: Industry | "realEstate" | "other";
  label: string;
  icon: React.ReactNode;
  description: string;
  selected: boolean;
  onSelect: () => void;
}> = ({ label, icon, description, selected, onSelect }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`industry-card cursor-pointer border-2 ${
            selected ? "border-blue-400 ring-4 ring-blue-50" : "border-blue-0"
          } ${selected ? "selected" : ""} rounded-2xl`}
          onClick={onSelect}
          aria-label={label}
          role="button"
          tabIndex={0}
          onKeyDown={e => (e.key === "Enter" || e.key === " ") && onSelect()}
        >
          <div className="flex flex-col items-center gap-2">
            <div
              className={`p-3 rounded-full ${
                selected
                  ? "bg-blue-500 bg-calculator-blue text-blue border-blue-600"
                  : "bg-blue-100 text-calculator-blue border-blue-200"
              }`}
            >
              {icon}
            </div>
            <h3 className="font-inter font-medium text-center">{label}</h3>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const IndustrySelector: React.FC = () => {
  const { calculatorData, updateCalculatorData } = useCalculator();

  return (
    <div className="mb-8">
      <h2 className="font-poppins font-bold text-2xl mb-4">
        Select Your Business Type
      </h2>
      {/* Removed subtitle */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {INDUSTRIES.map(({ id, label, icon, description }) => (
          <IndustryCard
            key={label}
            industry={id}
            label={label}
            icon={icon}
            description={description}
            selected={calculatorData.industry === id}
            onSelect={() => updateCalculatorData({ industry: id as Industry })}
          />
        ))}
      </div>
    </div>
  );
};

export default IndustrySelector;

