
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const GenerateSampleData = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateSampleData = async () => {
    try {
      setIsGenerating(true);
      
      const { data, error } = await supabase.functions.invoke('generate-sample-data', {});

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Success",
        description: "Sample data generated successfully!",
      });

      // Reload the page to refresh the data
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to generate sample data: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      onClick={handleGenerateSampleData}
      disabled={isGenerating}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Database className="h-4 w-4" />
      {isGenerating ? "Generating..." : "Generate Sample Data"}
    </Button>
  );
};
