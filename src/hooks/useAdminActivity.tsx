
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface AdminActivity {
  id: string;
  event_type: string;
  performed_by_email: string;
  details: string;
  timestamp: string;
  ip_address: string;
  user_agent: string;
}

export function useAdminActivity() {
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<AdminActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [adminFilter, setAdminFilter] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log("Fetching admin activities from Supabase...");
        
        // For now, create sample data since we don't have admin_activity table
        const sampleActivities: AdminActivity[] = [
          {
            id: "1",
            event_type: "user_created",
            performed_by_email: "admin@example.com",
            details: "Created new user account",
            timestamp: new Date().toISOString(),
            ip_address: "192.168.1.1",
            user_agent: "Mozilla/5.0"
          },
          {
            id: "2",
            event_type: "user_updated",
            performed_by_email: "admin@example.com",
            details: "Updated user permissions",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            ip_address: "192.168.1.1",
            user_agent: "Mozilla/5.0"
          },
          {
            id: "3",
            event_type: "data_export",
            performed_by_email: "manager@example.com",
            details: "Exported user data",
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            ip_address: "192.168.1.2",
            user_agent: "Mozilla/5.0"
          }
        ];
        
        setActivities(sampleActivities);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities');
        console.error('Error fetching admin activities:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    let filtered = [...activities];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.performed_by_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.ip_address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Event type filter
    if (eventTypeFilter !== 'all') {
      filtered = filtered.filter(activity => activity.event_type === eventTypeFilter);
    }

    // Admin filter
    if (adminFilter !== 'all') {
      filtered = filtered.filter(activity => activity.performed_by_email === adminFilter);
    }

    // Date range filter
    if (dateRange.from || dateRange.to) {
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity.timestamp);
        const fromDate = dateRange.from;
        const toDate = dateRange.to;
        
        if (fromDate && toDate) {
          return activityDate >= fromDate && activityDate <= toDate;
        } else if (fromDate) {
          return activityDate >= fromDate;
        } else if (toDate) {
          return activityDate <= toDate;
        }
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof AdminActivity];
      let bValue: any = b[sortBy as keyof AdminActivity];

      if (sortBy === 'timestamp') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredActivities(filtered);
  }, [activities, searchTerm, eventTypeFilter, adminFilter, sortBy, sortDirection, dateRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setEventTypeFilter('all');
    setAdminFilter('all');
    setSortBy('timestamp');
    setSortDirection('desc');
    setDateRange({ from: undefined, to: undefined });
  };

  const uniqueEventTypes = [...new Set(activities.map(a => a.event_type))];
  const uniqueAdmins = [...new Set(activities.map(a => a.performed_by_email))];

  return {
    activities: filteredActivities,
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
  };
}
