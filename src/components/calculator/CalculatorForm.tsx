import React, { useState } from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import ReceptionistStatus from './ReceptionistStatus';
import SharedInputs from './SharedInputs';
import ReceptionistInputs from './ReceptionistInputs';
import NoReceptionistInputs from './NoReceptionistInputs';

const CalculatorForm: React.FC = () => {
  const { calculateResults, isCalculated } = useCalculator();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading time for calculation
    setTimeout(() => {
      calculateResults();
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <form onSubmit={handleSubmit}>
        {/* Industry selector is moved to the top level component */}
        <ReceptionistStatus />
        <SharedInputs />
        <ReceptionistInputs />
        <NoReceptionistInputs />
        
        <div className="mt-8 mb-4">
          <div className="flex items-center justify-center mb-4">
            <Lock size={16} className="text-gray-500 mr-2" />
            <p className="text-gray-500 text-sm">We never save your answers. This is for your eyes only.</p>
          </div>
          
          <Button 
            type="submit"
            className="calculator-button w-full"
            disabled={isLoading || isCalculated}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                CALCULATING...
              </span>
            ) : isCalculated ? 'CALCULATED' : 'CALCULATE SAVINGS'}
          </Button>
          
          {isCalculated && (
            <Button 
              type="button"
              variant="outline"
              className="w-full mt-4 border border-blue-600 text-calculator-blue hover:bg-blue-200"
              onClick={() => window.location.reload()}
            >
              TRY AGAIN
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm;
