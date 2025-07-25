import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/config';

export interface SupportTicket {
  ticket_id: string;
  user_email: string;
  subject: string;
  status: string;
  last_updated: string;
  assigned_admin: string | null;
  priority: string;
  message: string;
}

export function useSupportTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/support-tickets`);
        if (!response.ok) throw new Error('Failed to fetch tickets');
        const data = await response.json();
        setTickets(data);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load tickets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return { tickets, isLoading, error };
}
