
import React from "react";
import { CalculatorProvider } from "@/contexts/CalculatorContext";
import IndustrySelector from "./IndustrySelector";
import CalculatorForm from "./CalculatorForm";
import ResultsSection from "./ResultsSection";
import BeforeAfterSnapshot from "./BeforeAfterSnapshot";

const Calculator: React.FC = () => {
  return (
    <CalculatorProvider>
      <div className="max-w-4xl mx-auto">
        {/* Move IndustrySelector to the very top */}
        <IndustrySelector />
        <BeforeAfterSnapshot />
        <CalculatorForm />
        <ResultsSection />
      </div>
    </CalculatorProvider>
  );
};

export default Calculator;
