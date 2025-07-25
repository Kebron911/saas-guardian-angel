import React, { useState, useMemo } from "react";
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
import { useAdminActivity } from "@/hooks/useAdminActivity";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AdminActivityFeed = () => {
  const { activities, isLoading } = useAdminActivity();

  // Filter states
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("all");
  const [admin, setAdmin] = useState("all");
  const [ip, setIp] = useState("all");
  const [time, setTime] = useState("all");

  // Get unique filter values
  const eventTypes = useMemo(() => {
    const setVals = new Set(activities.map(a => a.event_type).filter(Boolean));
    return Array.from(setVals);
  }, [activities]);
  const admins = useMemo(() => {
    const setVals = new Set(
      activities.map(a => a.performed_by_email && a.performed_by_email.trim() ? a.performed_by_email : "System")
    );
    return Array.from(setVals);
  }, [activities]);
  const ips = useMemo(() => {
    const setVals = new Set(activities.map(a => a.ip_address).filter(Boolean));
    return Array.from(setVals);
  }, [activities]);

  // Filtering logic
  const filtered = useMemo(() => {
    return activities.filter(a => {
      // Search
      const searchMatch =
        !search ||
        a.event_type?.toLowerCase().includes(search.toLowerCase()) ||
        (a.performed_by_email ? a.performed_by_email.toLowerCase() : 'system').includes(search.toLowerCase()) ||
        a.details?.toLowerCase().includes(search.toLowerCase()) ||
        a.ip_address?.toLowerCase().includes(search.toLowerCase());

      // Event type filter
      const eventTypeMatch = eventType === "all" || a.event_type === eventType;
      // Admin filter (always include 'System' and empty)
      const adminMatch = admin === "all" || (a.performed_by_email && a.performed_by_email.trim() ? a.performed_by_email : "System") === admin;
      // IP filter
      const ipMatch = ip === "all" || a.ip_address === ip;
      // Time filter (simple: last 24h, 7d, 30d, all)
      let timeMatch = true;
      if (time !== "all" && a.timestamp) {
        const now = new Date();
        const ts = new Date(a.timestamp);
        if (time === "24h") timeMatch = now.getTime() - ts.getTime() <= 24 * 60 * 60 * 1000;
        else if (time === "7d") timeMatch = now.getTime() - ts.getTime() <= 7 * 24 * 60 * 60 * 1000;
        else if (time === "30d") timeMatch = now.getTime() - ts.getTime() <= 30 * 24 * 60 * 60 * 1000;
      }

      return searchMatch && eventTypeMatch && adminMatch && ipMatch && timeMatch;
    });
  }, [activities, search, eventType, admin, ip, time]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <Input
          placeholder="Search activity..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="md:w-64"
        />
        <Select value={eventType} onValueChange={setEventType}>
          <SelectTrigger className="md:w-40">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            {eventTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={admin} onValueChange={setAdmin}>
          <SelectTrigger className="md:w-40">
            <SelectValue placeholder="Admin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Admins</SelectItem>
            {admins.map(a => (
              <SelectItem key={a} value={a}>{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={ip} onValueChange={setIp}>
          <SelectTrigger className="md:w-40">
            <SelectValue placeholder="IP Address" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All IPs</SelectItem>
            {ips.map(ipVal => (
              <SelectItem key={ipVal} value={ipVal}>{ipVal}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger className="md:w-40">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="24h">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7d</SelectItem>
            <SelectItem value="30d">Last 30d</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  <LoadingSpinner />
                </TableCell>
              </TableRow>
            ) : filtered.length > 0 ? (
              filtered.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.event_type}</TableCell>
                  <TableCell>
                    {activity.performed_by_email && activity.performed_by_email !== "System"
                      ? activity.performed_by_email
                      : activity.performed_by_email === "System"
                        ? "System"
                        : "Unknown"}
                  </TableCell>
                  <TableCell>{activity.details}</TableCell>
                  <TableCell>
                    {activity.timestamp ? format(new Date(activity.timestamp), 'MMM dd, yyyy, HH:mm') : 'N/A'}
                  </TableCell>
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
    </div>
  );
};
