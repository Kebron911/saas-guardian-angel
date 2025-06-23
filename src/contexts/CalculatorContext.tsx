
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Industry = 'dental' | 'law' | 'hvac' | 'automotive' | 'tech' | 'hospitality' | 'food' | 'education' | 'real-estate' | 'other';

export type ReceptionistStatus = 'yes' | 'no';

export type PricingPackage = 'starter' | 'professional' | 'enterprise' | null;

export interface CalculatorData {
  industry: Industry;
  receptionistStatus: ReceptionistStatus;
  missedCalls: number;
  revenuePerCall: number;
  callDuration: number;
  receptionistSalary?: number;
  businessHoursWeek?: number;
  callsAnsweredByStaff?: number;
  valuePerHour?: number;
  callsAnsweredByOwner?: number;
}

export interface PricingTier {
  name: string;
  price: number;
  minutesPerMonth: number | 'unlimited';
  features: string[];
  popular?: boolean;
}

export interface CalculationResults {
  lostRevenuePerMonth: number;
  timeValueCost: number;
  receptionistCost: number;
  aiReceptionistCost: number;
  monthlySavings: number;
  roiPercentage: number;
  annualizedSavings: number;
  breakEvenDays: number;
  estimatedMinutesPerMonth: number;
  recommendedPackage: PricingPackage;
}

interface CalculatorContextType {
  calculatorData: CalculatorData;
  updateCalculatorData: (data: Partial<CalculatorData>) => void;
  resetCalculatorData: () => void;
  calculationResults: CalculationResults | null;
  calculateResults: () => void;
  isCalculated: boolean;
  setIsCalculated: (value: boolean) => void;
  pricingTiers: PricingTier[];
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'starter',
    price: 299,
    minutesPerMonth: 500,
    features: [
      '24/7 AI Receptionist',
      'Up to 500 minutes/month',
      'Basic call analytics',
      'Email notifications'
    ]
  },
  {
    name: 'professional',
    price: 599,
    minutesPerMonth: 1500,
    popular: true,
    features: [
      'Everything in Starter',
      'Up to 1500 minutes/month',
      'Advanced call routing',
      'SMS notifications',
      'Custom voice selection'
    ]
  },
  {
    name: 'enterprise',
    price: 1299,
    minutesPerMonth: 'unlimited',
    features: [
      'Everything in Professional',
      'Unlimited minutes',
      'Premium voice options',
      'API integration',
      'Custom script development',
      'Dedicated support'
    ]
  }
];

const defaultCalculatorData: CalculatorData = {
  industry: 'other',
  receptionistStatus: 'no',
  missedCalls: 0,
  revenuePerCall: 0,
  callDuration: 0,
  receptionistSalary: 0,
  businessHoursWeek: 40,
  callsAnsweredByStaff: 0,
  valuePerHour: 0,
  callsAnsweredByOwner: 0,
};

export const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [calculatorData, setCalculatorData] = useState<CalculatorData>(defaultCalculatorData);
  const [calculationResults, setCalculationResults] = useState<CalculationResults | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const updateCalculatorData = (data: Partial<CalculatorData>) => {
    setCalculatorData((prev) => ({ ...prev, ...data }));
  };

  const resetCalculatorData = () => {
    setCalculatorData(defaultCalculatorData);
    setCalculationResults(null);
    setIsCalculated(false);
  };
  
  const getRecommendedPackage = (estimatedMinutesPerMonth: number): PricingPackage => {
    if (estimatedMinutesPerMonth <= 500) {
      return 'starter';
    } else if (estimatedMinutesPerMonth <= 1500) {
      return 'professional';
    } else {
      return 'enterprise';
    }
  };
  
  const getPackagePrice = (packageType: PricingPackage): number => {
    switch (packageType) {
      case 'starter':
        return 299;
      case 'professional':
        return 599;
      case 'enterprise':
        return 1299;
      default:
        return 299; // Default to starter
    }
  };

  const calculateResults = () => {
    const {
      missedCalls,
      revenuePerCall,
      callDuration,
      receptionistStatus,
      receptionistSalary = 0,
      valuePerHour = 0,
      callsAnsweredByStaff = 0,
      callsAnsweredByOwner = 0,
    } = calculatorData;

    // Convert daily calls to monthly (assuming 22 business days per month)
    const BUSINESS_DAYS_PER_MONTH = 22;
    const monthlyCallsAnswered = receptionistStatus === 'yes' 
      ? callsAnsweredByStaff * BUSINESS_DAYS_PER_MONTH 
      : callsAnsweredByOwner * BUSINESS_DAYS_PER_MONTH;
    
    // Calculate total call minutes per month
    const totalCallMinutes = (monthlyCallsAnswered + missedCalls) * callDuration;
    
    // Calculate estimated minutes per month for AI receptionist
    const estimatedMinutesPerMonth = totalCallMinutes;

    // Get recommended package based on estimated minutes
    const recommendedPackage = getRecommendedPackage(estimatedMinutesPerMonth);
    
    // Calculate AI receptionist cost based on recommended package
    const AI_RECEPTIONIST_COST = getPackagePrice(recommendedPackage);

    // Calculate lost revenue from missed calls
    const lostRevenuePerMonth = missedCalls * revenuePerCall;

    // Calculate time value cost (monthly)
    const timeSpentOnCalls = (monthlyCallsAnswered * callDuration) / 60; // Convert to hours
    const hourlyValue = receptionistStatus === 'yes' ? 0 : valuePerHour;
    const timeValueCost = timeSpentOnCalls * hourlyValue;

    // Calculate receptionist cost
    const receptionistCost = receptionistStatus === 'yes' ? receptionistSalary : 0;

    // Calculate savings
    const monthlySavings = lostRevenuePerMonth + receptionistCost + timeValueCost - AI_RECEPTIONIST_COST;

    // ROI calculation
    const roiPercentage = (monthlySavings / AI_RECEPTIONIST_COST) * 100;

    // Annualized savings
    const annualizedSavings = monthlySavings * 12;

    // Break-even calculation (days)
    const dailySavings = monthlySavings / 30; // Approximate days in a month
    const breakEvenDays = dailySavings > 0 ? AI_RECEPTIONIST_COST / dailySavings : 0;

    const results: CalculationResults = {
      lostRevenuePerMonth,
      timeValueCost,
      receptionistCost,
      aiReceptionistCost: AI_RECEPTIONIST_COST,
      monthlySavings,
      roiPercentage,
      annualizedSavings,
      breakEvenDays,
      estimatedMinutesPerMonth,
      recommendedPackage,
    };

    setCalculationResults(results);
    setIsCalculated(true);
  };

  return (
    <CalculatorContext.Provider
      value={{
        calculatorData,
        updateCalculatorData,
        resetCalculatorData,
        calculationResults,
        calculateResults,
        isCalculated,
        setIsCalculated,
        pricingTiers: PRICING_TIERS,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};
