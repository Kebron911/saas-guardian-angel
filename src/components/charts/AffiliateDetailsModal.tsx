import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface AffiliateDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  affiliate: any | null;
  loading?: boolean;
}

const AffiliateDetailsModal: React.FC<AffiliateDetailsModalProps> = ({ open, onOpenChange, affiliate, loading }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Affiliate Details</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="py-8 text-center">Loading...</div>
        ) : affiliate ? (
          <div className="space-y-4">
            <div>
              <span className="font-semibold">Affiliate ID:</span> {affiliate.affiliate?.id}
            </div>
            <div>
              <span className="font-semibold">Created At:</span> {affiliate.affiliate?.created_at ? new Date(affiliate.affiliate.created_at).toLocaleString() : "-"}
            </div>
            <div>
              <span className="font-semibold">User Name:</span> {affiliate.user?.name}
            </div>
            <div>
              <span className="font-semibold">User Email:</span> {affiliate.user?.email}
            </div>
            <div>
              <span className="font-semibold">User Created At:</span> {affiliate.user?.created_at ? new Date(affiliate.user.created_at).toLocaleString() : "-"}
            </div>
            <div>
              <span className="font-semibold">Organization ID:</span> {affiliate.user?.organization_id || "-"}
            </div>
            <div>
              <span className="font-semibold">Subscription Status:</span> {affiliate.user?.subscription_status || "-"}
            </div>
            <div>
              <span className="font-semibold">Current Period End:</span> {affiliate.user?.current_period_end ? new Date(affiliate.user.current_period_end).toLocaleString() : "-"}
            </div>
            {/* Add more fields as needed */}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">No affiliate data found.</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AffiliateDetailsModal;
