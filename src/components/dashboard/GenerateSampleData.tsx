
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const GenerateSampleData = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      
      const { data, error } = await supabase.functions.invoke('generate-sample-data');
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Sample Data Generated",
        description: "New sample data has been loaded for demonstration."
      });
    } catch (error) {
      console.error("Error generating sample data:", error);
      toast({
        title: "Error",
        description: "Failed to generate sample data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Button 
      variant="outline" 
      onClick={handleGenerate}
      className="flex items-center"
      disabled={isGenerating}
    >
      <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
      {isGenerating ? 'Generating...' : 'Generate Sample Data'}
    </Button>
  );
};
