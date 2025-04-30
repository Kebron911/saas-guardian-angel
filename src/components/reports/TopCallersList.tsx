
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data for top callers
const topCallersData = [
  { id: 1, name: "John Smith", number: "(555) 123-4567", totalCalls: 12, avgDuration: "3m 24s", lastCallDate: "Apr 20, 2025" },
  { id: 2, name: "Sarah Johnson", number: "(555) 987-6543", totalCalls: 8, avgDuration: "2m 58s", lastCallDate: "Apr 19, 2025" },
  { id: 3, name: "Michael Brown", number: "(555) 456-7890", totalCalls: 7, avgDuration: "4m 12s", lastCallDate: "Apr 18, 2025" },
  { id: 4, name: "Emily Davis", number: "(555) 234-5678", totalCalls: 5, avgDuration: "1m 45s", lastCallDate: "Apr 17, 2025" },
  { id: 5, name: "David Wilson", number: "(555) 345-6789", totalCalls: 4, avgDuration: "2m 32s", lastCallDate: "Apr 15, 2025" }
];

export function TopCallersList() {
  return (
    <Card className="shadow-sm mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Top Callers</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name / Number</TableHead>
                <TableHead className="text-right">Total Calls</TableHead>
                <TableHead className="text-right">Avg. Duration</TableHead>
                <TableHead className="text-right">Last Call</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCallersData.map((caller) => (
                <TableRow key={caller.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{caller.name}</p>
                      <p className="text-xs text-gray-500">{caller.number}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{caller.totalCalls}</TableCell>
                  <TableCell className="text-right">{caller.avgDuration}</TableCell>
                  <TableCell className="text-right">{caller.lastCallDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Add to contacts</span>
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">View call log</span>
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
