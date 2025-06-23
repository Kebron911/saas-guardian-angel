
import React from 'react';
import { Check, ChartBar, Zap, Shield } from 'lucide-react';
import { useCalculator } from '@/contexts/CalculatorContext';

const ResultsHeader: React.FC = () => {
  const { calculatorData } = useCalculator();
  
  // Get industry-specific text
  const getIndustryText = () => {
    switch (calculatorData.industry) {
      case 'dental': return 'Dental Office';
      case 'law': return 'Law Firm';
      case 'hvac': return 'HVAC Service';
      case 'automotive': return 'Automotive Service';
      case 'tech': return 'Tech Support';
      case 'hospitality': return 'Hospitality Business';
      case 'food': return 'Food & Beverage';
      case 'education': return 'Educational Institution';
      case 'real-estate': return 'Real Estate Business';
      default: return 'Service Business';
    }
  };
  
  return (
    <div className="flex flex-col items-center mt-12 mb-6">
      <div className="flex items-center mb-4">
        <Check className="text-calculator-green mr-2" />
        <p className="text-lg">Trusted by {getIndustryText()} owners nationwide</p>
      </div>
      <div className="flex gap-3 mb-4">
        <div className="flex items-center">
          <ChartBar className="text-calculator-blue mr-1" size={20} />
          <span>24/7 Coverage</span>
        </div>
        <div className="flex items-center">
          <Zap className="text-calculator-yellow mr-1" size={20} />
          <span>Never Miss a Call</span>
        </div>
        <div className="flex items-center">
          <Shield className="text-calculator-green mr-1" size={20} />
          <span>Secure & Private</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;
