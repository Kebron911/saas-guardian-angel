
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, CreditCard, CheckCircle2, Trash2 } from "lucide-react";
import { useBillingData } from "@/hooks/useBillingData";
import { Skeleton } from "@/components/ui/skeleton";

export function PaymentMethods() {
  const { billingData, isLoading, error } = useBillingData();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle><Skeleton className="h-6 w-40" /></CardTitle>
          <CardDescription><Skeleton className="h-4 w-56" /></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(2).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-8 w-12 rounded" />
                  <div>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24 mt-1" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-9 w-20" />
                </div>
              </div>
            ))}
            <div className="mt-6">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !billingData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-500">
            Error loading payment methods
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your payment options</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {billingData.paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-2 rounded w-12 h-8 flex items-center justify-center">
                  {method.type === 'visa' ? 'VISA' : 
                   method.type === 'mastercard' ? 'MC' : 
                   method.type === 'amex' ? 'AMEX' : method.type}
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="font-medium">•••• {method.last4}</p>
                    {method.isDefault && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Expires {method.expiryMonth}/{method.expiryYear}</p>
                </div>
              </div>
              <div>
                {showDeleteConfirm === method.id ? (
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => {
                        // In a real app, this would delete the payment method
                        setShowDeleteConfirm(null);
                      }}
                    >
                      Confirm
                    </Button>
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="ghost"
                    size="sm"
                    disabled={method.isDefault}
                    onClick={() => setShowDeleteConfirm(method.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button className="w-full mt-4" variant="outline">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
