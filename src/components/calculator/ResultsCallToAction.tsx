import React from 'react';
import { Button } from '@/components/ui/button';

const ResultsCallToAction: React.FC = () => {
  return (
    <div className="bg-blue-50 rounded-lg p-6 text-center">
      <h3 className="font-poppins font-bold text-2xl mb-3">Want These Results?</h3>
      <p className="text-lg mb-6">Get a receptionist that never misses a call. Setup takes minutes.</p>
      <a href="/order">
        <Button
          className="bg-blue-600 hover:bg-blue-800 text-white font-inter uppercase font-bold text-lg px-8 py-3 border-2 border-transparent hover:border-black"
        >
          START YOUR FREE TRIAL
        </Button>
      </a>
    </div>
  );
};

export default ResultsCallToAction;
