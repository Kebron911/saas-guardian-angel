import React from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { formatCurrency } from '@/lib/utils';

const ComparisonGraphic: React.FC = () => {
  const { calculatorData, calculationResults } = useCalculator();
  
  // Use the entered receptionist salary or default to $3,000
  const receptionistSalary = (calculatorData.receptionistSalary && calculatorData.receptionistSalary > 0) 
    ? calculatorData.receptionistSalary 
    : 3000;
  
  // Get AI receptionist cost from calculation results or use starter package cost
  const aiReceptionistCost = calculationResults?.aiReceptionistCost || 299;
  
  return (
    <div className="my-10 rounded-lg overflow-hidden">
      <h3 className="font-poppins font-bold text-xl mb-4">Receptionist Comparison</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h4 className="font-inter font-bold text-lg mb-4 text-gray-800">Human Receptionist</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-calculator-red">$</span>
              <span>{formatCurrency(receptionistSalary)}/month</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-calculator-red">⏰</span>
              <span>9–5 (M–F)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-calculator-red">🏥</span>
              <span>Benefits & insurance costs</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-calculator-red">☕</span>
              <span>Breaks & time off needed</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-calculator-red">🤒</span>
              <span>Sick days & turnover</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-calculator-red">🔄</span>
              <span>Training & onboarding time</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-calculator-red">⚠️</span>
              <span>Limited capacity</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-calculator-blue bg-opacity-5 shadow rounded-lg p-6 border-2 border-blue-500">
          <h4 className="font-inter font-bold text-lg mb-4 text-calculator-blue">AI Receptionist</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-calculator-green">$</span>
              <span>{formatCurrency(aiReceptionistCost)}/month</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-calculator-green">⏰</span>
              <span>24/7/365</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-calculator-green">💰</span>
              <span>No benefits or added costs</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-calculator-green">⚡</span>
              <span>No breaks needed</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-calculator-green">✅</span>
              <span>No sick days, no training</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-calculator-green">🚀</span>
              <span>Instant setup</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-calculator-green">⚡</span>
              <span>Scales instantly</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComparisonGraphic;
