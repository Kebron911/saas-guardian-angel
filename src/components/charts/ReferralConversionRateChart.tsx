import React from "react";

export interface ReferralConversionRateChartProps {
  rate: number;
}

const ReferralConversionRateChart: React.FC<ReferralConversionRateChartProps> = ({ rate }) => {
  if (rate === undefined || rate === null || isNaN(rate)) {
    return <div className="text-center text-gray-400 py-8">No conversion data available</div>;
  }

  // Simple gauge style
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831"
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeDasharray={`${rate}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-green-600">{rate.toFixed(1)}%</span>
          <span className="text-xs text-gray-500 mt-1">Conversion Rate</span>
        </div>
      </div>
    </div>
  );
};

export default ReferralConversionRateChart;
