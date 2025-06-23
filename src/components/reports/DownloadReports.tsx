
import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Mail, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DownloadReports = () => {
  const { toast } = useToast();
  
  const handleDownload = (format: string) => {
    toast({
      title: "Report Generated",
      description: `Your ${format} report is being downloaded.`,
    });
  };
  
  const handleEmail = () => {
    toast({
      title: "Report Emailed",
      description: "The report has been sent to your email address.",
    });
  };
  
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      <Button variant="outline" onClick={() => handleDownload("PDF")}>
        <FileDown className="h-4 w-4 mr-2" />
        Export PDF
      </Button>
      
      <Button variant="outline" onClick={() => handleDownload("Excel")}>
        <FileDown className="h-4 w-4 mr-2" />
        Export Excel
      </Button>
      
      <Button variant="outline" onClick={handleEmail}>
        <Mail className="h-4 w-4 mr-2" />
        Email Report
      </Button>
      
      <Button variant="outline" onClick={() => handleDownload("Print")}>
        <Printer className="h-4 w-4 mr-2" />
        Print Report
      </Button>
    </div>
  );
};
