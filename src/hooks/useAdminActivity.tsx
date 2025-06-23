import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/config';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/analytics/admin-activity`);
        if (!response.ok) throw new Error('Failed to fetch activities');
        const data = await response.json();
        setActivities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities');
        console.error('Error fetching admin activities:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, isLoading, error };
}
