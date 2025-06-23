
import React from 'react';

interface ResultCardProps {
  title: string;
  value: string;
  description: string;
  color: string;
  order: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, value, description, color, order }) => {
  return (
    <div 
      className="result-card" 
      style={{ 
        borderLeftColor: color,
        '--animation-order': order 
      } as React.CSSProperties}
    >
      <h3 className="font-inter font-bold text-lg text-gray-800">{title}</h3>
      <div className="text-2xl font-poppins font-bold mt-2 mb-1" style={{ color }}>{value}</div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ResultCard;
