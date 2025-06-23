
import React from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { format } from "date-fns";
import { useAdminDashboardData } from "@/hooks/useAdminDashboardData"; 

export const AdminActivityFeed = () => {
  const { activityData, isLoading } = useAdminDashboardData();

  if (isLoading) {
    return <div className="flex justify-center my-6"><LoadingSpinner /></div>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Type</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>IP Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activityData && activityData.length > 0 ? (
            activityData.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.event_type}</TableCell>
                <TableCell>{activity.performed_by_email}</TableCell>
                <TableCell>{activity.details}</TableCell>
                <TableCell>{
                  activity.timestamp ? format(new Date(activity.timestamp), 'MMM dd, yyyy, HH:mm') : 'N/A'
                }</TableCell>
                <TableCell>{activity.ip_address}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                No admin activity found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
