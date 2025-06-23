
import React from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import PackageCard from './PackageCard';

const PricingTiers: React.FC = () => {
  const { calculationResults, pricingTiers } = useCalculator();
  const recommendedPackage = calculationResults?.recommendedPackage;
  const estimatedMinutesPerMonth = calculationResults?.estimatedMinutesPerMonth || 0;
  
  const handleSelectPackage = (packageName: string) => {
    alert(`You selected the ${packageName} package. This would start the signup process in a real implementation.`);
  };
  
  return (
    <div className="mb-12">
      <h3 className="font-poppins font-bold text-2xl mb-6">Estimated Usage: {Math.round(estimatedMinutesPerMonth)} minutes/month</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingTiers.map((tier) => (
          <PackageCard
            key={tier.name}
            name={tier.name}
            price={tier.price}
            features={tier.features}
            isPopular={tier.popular}
            isRecommended={recommendedPackage === tier.name}
            onSelect={() => handleSelectPackage(tier.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingTiers;
