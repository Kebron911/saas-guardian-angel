import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';

interface AdminActivity {
  id: string;
  event_type: string;
  performed_by_email: string;
  details: string;
  timestamp: string;
  ip_address: string;
  user_agent?: string;
}

export function useAdminActivity() {
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Use the correct backend endpoint
        const data = await apiClient.get('/admin/admin-activity');
        setActivities(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || 'Failed to load activities');
        console.error('Error fetching admin activities:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return { activities, isLoading, error };
}
