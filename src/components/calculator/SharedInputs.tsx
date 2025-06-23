
import React from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { Headset, DollarSign, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SharedInputs: React.FC = () => {
  const { calculatorData, updateCalculatorData } = useCalculator();
  
  // Get industry-specific terminology
  const getCallsLabel = () => {
    switch (calculatorData.industry) {
      case 'dental': return 'Monthly missed patient calls';
      case 'law': return 'Monthly missed client calls';
      case 'hvac': return 'Monthly missed service calls';
      case 'automotive': return 'Monthly missed customer calls';
      case 'tech': return 'Monthly missed support calls';
      case 'hospitality': return 'Monthly missed guest calls';
      case 'food': return 'Monthly missed reservation calls';
      case 'education': return 'Monthly missed inquiry calls';
      default: return 'Monthly missed calls';
    }
  };

  // Industry-specific revenue tooltip
  const getRevenueTooltip = () => {
    switch (calculatorData.industry) {
      case 'dental': return 'Include initial consultations, routine check-ups, and procedures';
      case 'law': return 'Consider initial consultations and case values';
      case 'hvac': return 'Include emergency services and routine maintenance calls';
      case 'automotive': return 'Include service bookings and sales inquiries';
      case 'tech': return 'Consider support contracts and service inquiries';
      case 'hospitality': return 'Include booking values and service add-ons';
      case 'food': return 'Consider reservation values and delivery orders';
      case 'education': return 'Include enrollment values and program fees';
      default: return 'The average revenue generated from each customer interaction';
    }
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    updateCalculatorData({ [field]: value });
  };

  return (
    <div className="mb-8">
      <h2 className="font-poppins font-bold text-2xl mb-4">Basic Information</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Missed Calls Input */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Headset className="text-calculator-blue" />
              <Label htmlFor="missedCalls" className="calculator-label">{getCallsLabel()}</Label>
            </div>
            <Input
              id="missedCalls"
              type="number"
              className="calculator-input"
              placeholder="e.g., 35"
              value={calculatorData.missedCalls || ''}
              onChange={handleInputChange('missedCalls')}
              min="0"
            />
          </div>
          
          {/* Revenue Per Call Input */}
          <div className="space-y-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="text-calculator-blue" />
                    <Label htmlFor="revenuePerCall" className="calculator-label">Avg revenue per call</Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getRevenueTooltip()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="revenuePerCall"
                type="number"
                className="calculator-input pl-8"
                placeholder="e.g., 75"
                value={calculatorData.revenuePerCall || ''}
                onChange={handleInputChange('revenuePerCall')}
                min="0"
              />
            </div>
          </div>
          
          {/* Call Duration Input */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="text-calculator-blue" />
              <Label htmlFor="callDuration" className="calculator-label">Avg call duration (mins)</Label>
            </div>
            <Input
              id="callDuration"
              type="number"
              className="calculator-input"
              placeholder="e.g., 15"
              value={calculatorData.callDuration || ''}
              onChange={handleInputChange('callDuration')}
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedInputs;
