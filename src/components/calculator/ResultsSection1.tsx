import React, { useRef, useEffect } from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import ResultsCards from './ResultsCards';
import PricingTiers from './PricingTiers';
import ComparisonGraphic from './ComparisonGraphic';
import ResultsHeader from './ResultsHeader';
import ResultsCallToAction from './ResultsCallToAction';

const ResultsSection1: React.FC = () => {
  const { isCalculated, calculationResults } = useCalculator();
  const resultsRef1 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCalculated && resultsRef1.current) {
      setTimeout(() => {
        resultsRef1.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isCalculated]);

  if (!isCalculated || !calculationResults) {
    return null;
  }

  return (
    <div ref={resultsRef1} className="mt-12 pt-6 border-t-2 border-gray-100">
      <h2 className="font-poppins font-bold text-3xl mb-6 text-center">Your AI Receptionist Savings</h2>
      <ResultsCards />
      <PricingTiers />
      <ComparisonGraphic />
      <ResultsHeader />
      <ResultsCallToAction />
    </div>
  );
};

export default ResultsSection1;