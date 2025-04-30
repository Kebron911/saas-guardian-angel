
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function DownloadReports() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Download Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium mb-2">Call Details Report</h4>
            <p className="text-sm text-gray-500 mb-4">Complete log of all calls with duration, outcome, and timestamps.</p>
            <Button className="bg-[#1A237E] hover:bg-[#0E1358] w-full">
              <Download className="h-4 w-4 mr-2" />
              Download as CSV
            </Button>
          </div>
          
          <div className="flex-1 p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium mb-2">Performance Summary</h4>
            <p className="text-sm text-gray-500 mb-4">AI assistant metrics, handling rates, and comparison to previous periods.</p>
            <Button className="bg-[#1A237E] hover:bg-[#0E1358] w-full">
              <Download className="h-4 w-4 mr-2" />
              Download as PDF
            </Button>
          </div>
          
          <div className="flex-1 p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium mb-2">Custom Report</h4>
            <p className="text-sm text-gray-500 mb-4">Build a customized report with the exact metrics you need.</p>
            <Button className="bg-[#1A237E] hover:bg-[#0E1358] w-full">
              <Download className="h-4 w-4 mr-2" />
              Create Custom Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
