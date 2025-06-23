import React from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { Radio } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ReceptionistStatus: React.FC = () => {
  const { calculatorData, updateCalculatorData } = useCalculator();

  const handleChange = (value: string) => {
    updateCalculatorData({ 
      receptionistStatus: value as 'yes' | 'no',
      // Reset relevant fields when changing status
      receptionistSalary: value === 'yes' ? 0 : undefined,
      businessHoursWeek: value === 'yes' ? 40 : undefined,
      callsAnsweredByStaff: value === 'yes' ? 0 : undefined,
      valuePerHour: value === 'no' ? 0 : undefined,
      callsAnsweredByOwner: value === 'no' ? 0 : undefined,
    });
  };

  return (
    <div className="mb-8">
      <h2 className="font-poppins font-bold text-2xl mb-4">Do you currently have a receptionist?</h2>
      <RadioGroup 
        value={calculatorData.receptionistStatus} 
        onValueChange={handleChange}
        className="flex gap-4"
      >
        <div
          className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-slate-50 ${
            calculatorData.receptionistStatus === "yes" ? "bg-blue-50 border-blue-500" : ""
          }`}
        >
          <RadioGroupItem value="yes" id="receptionist-yes" />
          <Label htmlFor="receptionist-yes" className="text-lg cursor-pointer">Yes</Label>
        </div>
        <div
          className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-slate-50 ${
            calculatorData.receptionistStatus === "no" ? "bg-blue-50 border-blue-500" : ""
          }`}
        >
          <RadioGroupItem value="no" id="receptionist-no" />
          <Label htmlFor="receptionist-no" className="text-lg cursor-pointer">No</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ReceptionistStatus;
