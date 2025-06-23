
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useBillingData } from "@/hooks/useBillingData";
import { Skeleton } from "@/components/ui/skeleton";

export function BillingHistory() {
  const { billingData, isLoading, error } = useBillingData();
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
            <CardDescription><Skeleton className="h-4 w-48 mt-1" /></CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-4 w-16 ml-auto" />
                  <Skeleton className="h-6 w-20 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !billingData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-500">
            Error loading billing history
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download past invoices</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {billingData.invoiceHistory.map((invoice) => (
            <div key={invoice.id} className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <p className="font-medium">{invoice.date}</p>
                <p className="text-sm text-muted-foreground">Invoice #{invoice.id}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{invoice.amount}</p>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  <span className="text-xs">PDF</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
