import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface PackageCardProps {
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
  onSelect: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  name, 
  price, 
  features, 
  isPopular, 
  isRecommended, 
  onSelect 
}) => {
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-6 border-2 ${
        isRecommended ? 'border-blue-600' : 'border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="mb-4 text-center">
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">Popular</span>
        </div>
      )}

      <h3 className="font-poppins font-bold text-xl mb-2">{formattedName}</h3>

      <div className="font-poppins font-bold text-3xl mb-4">
        {formatCurrency(price)}
        <span className="text-sm font-normal text-gray-500">/month</span>
      </div>

      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check size={16} className="text-calculator-green mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={onSelect}
        className={`w-full ${
          isRecommended
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-white text-calculator-blue border border-blue-600 hover:bg-blue-700 hover:text-white'
        }`}
        variant={isRecommended ? "default" : "outline"}
      >
        {isRecommended ? 'RECOMMENDED' : 'Select ' + formattedName}
      </Button>
    </div>
  );
};

export default PackageCard;
