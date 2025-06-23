
import React from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { User, Clock, Users } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ReceptionistInputs: React.FC = () => {
  const { calculatorData, updateCalculatorData } = useCalculator();
  
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    updateCalculatorData({ [field]: value });
  };

  // If they don't have a receptionist, don't show these fields
  if (calculatorData.receptionistStatus !== 'yes') {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="font-poppins font-bold text-2xl mb-4">Receptionist Information</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Monthly Salary Input */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User className="text-calculator-blue" />
              <Label htmlFor="receptionistSalary" className="calculator-label">Monthly receptionist salary</Label>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="receptionistSalary"
                type="number"
                className="calculator-input pl-8"
                placeholder="e.g., 3,000"
                value={calculatorData.receptionistSalary || ''}
                onChange={handleInputChange('receptionistSalary')}
                min="0"
              />
            </div>
          </div>
          
          {/* Business Hours Input */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="text-calculator-blue" />
              <Label htmlFor="businessHoursWeek" className="calculator-label">Business hours/week</Label>
            </div>
            <Input
              id="businessHoursWeek"
              type="number"
              className="calculator-input"
              placeholder="e.g., 45"
              value={calculatorData.businessHoursWeek || ''}
              onChange={handleInputChange('businessHoursWeek')}
              min="0"
              max="168"
            />
          </div>
          
          {/* Calls Answered Input */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Users className="text-calculator-blue" />
              <Label htmlFor="callsAnsweredByStaff" className="calculator-label">Calls answered by staff daily</Label>
            </div>
            <Input
              id="callsAnsweredByStaff"
              type="number"
              className="calculator-input"
              placeholder="e.g., 8"
              value={calculatorData.callsAnsweredByStaff || ''}
              onChange={handleInputChange('callsAnsweredByStaff')}
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistInputs;
