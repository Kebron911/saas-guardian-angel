import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalculatorProvider } from "@/contexts/CalculatorContext";
import CalculatorForm from "@/components/calculator/CalculatorForm";
import ResultsSection1 from "@/components/calculator/ResultsSection1";
import BeforeAfterSnapshot from "@/components/calculator/BeforeAfterSnapshot";
import IndustrySelector from "@/components/calculator/IndustrySelector";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ROICalculator = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="bg-white text-[#1A237E] hover:bg-[#E3F2FD] border-2 border-[#1A237E] font-bold text-lg px-6 py-3 rounded transition-all transform hover:scale-105"
        >
          How Much Could You Save? →
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Calculate Your ROI</DialogTitle>
          <DialogDescription>
            <span className="font-bold text-lg text-[#1A237E]">
              See how much you could save by switching to our AI receptionist.
            </span>
          </DialogDescription>
        </DialogHeader>
        <CalculatorProvider>
          <div className="max-w-4xl mx-auto">
          <IndustrySelector />
          <BeforeAfterSnapshot />
            <CalculatorForm />
            <ResultsSection1 />
          </div>
        </CalculatorProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ROICalculator;
