
import React from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export const AdminActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "New Signup",
      user: "Sarah Johnson",
      email: "sarah.j@example.com",
      timestamp: "Today, 10:23 AM",
      details: "Registered as a new user"
    },
    {
      id: 2,
      type: "Subscription",
      user: "Michael Chen",
      email: "mchen@company.co",
      timestamp: "Today, 09:15 AM",
      details: "Subscribed to Pro Plan ($49/month)"
    },
    {
      id: 3,
      type: "Referral",
      user: "Alex Rivera",
      email: "alex.r@domain.com",
      timestamp: "Yesterday, 2:45 PM",
      details: "Referred 2 new users"
    },
    {
      id: 4,
      type: "Transaction",
      user: "Emma Wilson",
      email: "ewilson@mail.org",
      timestamp: "Yesterday, 11:32 AM",
      details: "Payment of $149.00 received"
    },
    {
      id: 5,
      type: "Support",
      user: "James Smith",
      email: "jsmith@example.net",
      timestamp: "Sep 23, 2023",
      details: "Created new support ticket #45892"
    }
  ];

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Type</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell className="font-medium">{activity.type}</TableCell>
              <TableCell>{activity.user}</TableCell>
              <TableCell>{activity.email}</TableCell>
              <TableCell>{activity.timestamp}</TableCell>
              <TableCell>{activity.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
