import React, { useRef, useEffect } from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import ResultsCards from './ResultsCards';
import PricingTiers from './PricingTiers';
import ComparisonGraphic from './ComparisonGraphic';
import ResultsHeader from './ResultsHeader';
import ResultsActions from './ResultsActions';
import ResultsCallToAction from './ResultsCallToAction';

const ResultsSection: React.FC = () => {
  const { isCalculated, calculationResults } = useCalculator();
  const resultsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isCalculated && resultsRef.current) {
      // Scroll to results after a slight delay to allow animations
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isCalculated]);

  if (!isCalculated || !calculationResults) {
    return null;
  }

  return (
    <div ref={resultsRef} className="mt-12 pt-6 border-t-2 border-gray-100">
      <h2 className="font-poppins font-bold text-3xl mb-6 text-center">Your AI Receptionist Savings</h2>
      
      <ResultsCards />
      <PricingTiers />
      <ComparisonGraphic />
      <ResultsHeader />
      <ResultsActions />
      <ResultsCallToAction />
    </div>
  );
};

export default ResultsSection;
