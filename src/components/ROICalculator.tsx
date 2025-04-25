
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  const [calls, setCalls] = useState<number>(100);
  const [hours, setHours] = useState<number>(40);
  const [hourlyWage, setHourlyWage] = useState<number>(15);

  const calculateSavings = () => {
    const currentCost = (hours * hourlyWage * 52); // yearly cost
    const aiCost = (0.47 * hours * 52); // AI cost per year
    return (currentCost - aiCost).toFixed(2);
  };

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Calculate Your ROI</DialogTitle>
          <DialogDescription>
            See how much you could save by switching to our AI receptionist.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="calls">Average Calls per Week</Label>
            <Input
              id="calls"
              type="number"
              value={calls}
              onChange={(e) => setCalls(Number(e.target.value))}
              min={0}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hours">Reception Hours per Week</Label>
            <Input
              id="hours"
              type="number"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              min={0}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="wage">Current Hourly Wage ($)</Label>
            <Input
              id="wage"
              type="number"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(Number(e.target.value))}
              min={0}
            />
          </div>
          <div className="mt-4 p-4 bg-[#E3F2FD] rounded-lg">
            <h3 className="text-lg font-bold text-[#1A237E] mb-2">Estimated Yearly Savings</h3>
            <p className="text-2xl font-bold text-[#00B8D4]">${calculateSavings()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ROICalculator;
