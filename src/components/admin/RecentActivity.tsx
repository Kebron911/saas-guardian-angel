
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableFilters } from "./TableFilters";
import { useAdminActivity } from "@/hooks/useAdminActivity";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export const RecentActivity = () => {
  const {
    activities,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    eventTypeFilter,
    setEventTypeFilter,
    adminFilter,
    setAdminFilter,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    dateRange,
    setDateRange,
    clearFilters,
    uniqueEventTypes,
    uniqueAdmins
  } = useAdminActivity();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-500">
            Error loading activities: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  const sortOptions = [
    { value: 'timestamp', label: 'Time' },
    { value: 'event_type', label: 'Event Type' },
    { value: 'performed_by_email', label: 'Admin' },
    { value: 'ip_address', label: 'IP Address' }
  ];

  const filters = [
    {
      key: 'event_type',
      label: 'Event Type',
      value: eventTypeFilter,
      options: [
        { value: 'all', label: 'All Events' },
        ...uniqueEventTypes.map(type => ({ value: type, label: type }))
      ],
      onChange: setEventTypeFilter
    },
    {
      key: 'admin',
      label: 'Admin',
      value: adminFilter,
      options: [
        { value: 'all', label: 'All Admins' },
        ...uniqueAdmins.map(admin => ({ value: admin, label: admin }))
      ],
      onChange: setAdminFilter
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <TableFilters
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          sortValue={sortBy}
          onSortChange={setSortBy}
          sortDirection={sortDirection}
          onSortDirectionChange={setSortDirection}
          sortOptions={sortOptions}
          filters={filters}
          dateRange={dateRange}
          onClearFilters={clearFilters}
          searchPlaceholder="Search activities, admins, IP addresses..."
        />
        
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No activities found matching your filters
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{activity.event_type}</Badge>
                    <span className="text-sm text-gray-500">by {activity.performed_by_email}</span>
                  </div>
                  <p className="text-sm">{activity.details}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-400">
                    <span>IP: {activity.ip_address}</span>
                    <span>{new Date(activity.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
