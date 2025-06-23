
import React from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { formatCurrency } from '@/lib/utils';
import ResultCard from './ResultCard';

const ResultsCards: React.FC = () => {
  const { calculatorData, calculationResults } = useCalculator();
  
  if (!calculationResults) return null;

  const {
    lostRevenuePerMonth,
    timeValueCost,
    receptionistCost,
    aiReceptionistCost,
    monthlySavings,
    roiPercentage,
    annualizedSavings,
    breakEvenDays,
  } = calculationResults;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <ResultCard
        title="Lost Revenue per Month"
        value={formatCurrency(lostRevenuePerMonth)}
        description="Potential revenue you're missing from unanswered calls."
        color="#FBBF24" // Yellow
        order={1}
      />
      
      <ResultCard
        title="Your Time Value Cost"
        value={formatCurrency(timeValueCost)}
        description={
          calculatorData.receptionistStatus === 'no'
            ? "The cost of your time spent answering calls."
            : "Time value cost for staff answering calls."
        }
        color="#EF4444" // Red
        order={2}
      />
      
      {calculatorData.receptionistStatus === 'yes' && (
        <ResultCard
          title="Current Receptionist Cost"
          value={formatCurrency(receptionistCost)}
          description="Your monthly expense for receptionist salary."
          color="#1E40AF" // Blue
          order={3}
        />
      )}
      
      <ResultCard
        title="AI Receptionist Cost"
        value={formatCurrency(aiReceptionistCost)}
        description="Based on your recommended plan."
        color="#10B981" // Green
        order={4}
      />
      
      <ResultCard
        title="Estimated Monthly Savings"
        value={formatCurrency(monthlySavings)}
        description="Total money saved each month with AI."
        color="#8B5CF6" // Purple
        order={5}
      />
      
      <ResultCard
        title="ROI Calculation"
        value={`${Math.round(roiPercentage)}%`}
        description="Your return on investment with AI receptionist."
        color="#1E40AF" // Blue
        order={6}
      />
      
      <ResultCard
        title="Annualized Savings"
        value={formatCurrency(annualizedSavings)}
        description="That's your yearly savings with AI."
        color="#0D9488" // Teal
        order={7}
      />
      
      <ResultCard
        title="Break-Even Time"
        value={`${breakEvenDays.toFixed(1)} days`}
        description="Time to recoup your investment."
        color="#F97316" // Coral
        order={8}
      />
    </div>
  );
};

export default ResultsCards;
