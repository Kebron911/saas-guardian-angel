
import React from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { DollarSign, Users } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NoReceptionistInputs: React.FC = () => {
  const { calculatorData, updateCalculatorData } = useCalculator();
  
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    updateCalculatorData({ [field]: value });
  };

  // If they have a receptionist, don't show these fields
  if (calculatorData.receptionistStatus !== 'no') {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="font-poppins font-bold text-2xl mb-4">Your Time & Calls</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Value Per Hour Input */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="text-calculator-blue" />
              <Label htmlFor="valuePerHour" className="calculator-label">Your value per hour</Label>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="valuePerHour"
                type="number"
                className="calculator-input pl-8"
                placeholder="e.g., 250"
                value={calculatorData.valuePerHour || ''}
                onChange={handleInputChange('valuePerHour')}
                min="0"
              />
            </div>
          </div>
          
          {/* Calls Answered Input */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Users className="text-calculator-blue" />
              <Label htmlFor="callsAnsweredByOwner" className="calculator-label">Calls answered by owner/staff daily</Label>
            </div>
            <Input
              id="callsAnsweredByOwner"
              type="number"
              className="calculator-input"
              placeholder="e.g., 8"
              value={calculatorData.callsAnsweredByOwner || ''}
              onChange={handleInputChange('callsAnsweredByOwner')}
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoReceptionistInputs;
