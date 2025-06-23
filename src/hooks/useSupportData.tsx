import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/config';

interface SupportTicket {
  ticket_id: string;
  user_email: string;
  subject: string;
  status: string;
  last_updated: string;
  assigned_admin: string | null;
  priority: string;
  message: string;
}

export function useSupportData() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/analytics/support-tickets`);
        const data = await response.json();
        setTickets(data);
        setFilteredTickets(data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filterTickets = (search: string = '', status: string = 'all', priority: string = 'all', admin: string = 'all') => {
    let filtered = [...tickets];
    
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(ticket => 
        ticket.subject.toLowerCase().includes(term) ||
        ticket.user_email.toLowerCase().includes(term) ||
        ticket.ticket_id.toLowerCase().includes(term) ||
        (ticket.message && ticket.message.toLowerCase().includes(term))
      );
    }
    
    if (status !== 'all') {
      filtered = filtered.filter(ticket => ticket.status.toLowerCase() === status.toLowerCase());
    }
    
    if (priority !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority.toLowerCase() === priority.toLowerCase());
    }

    if (admin !== 'all') {
      if (admin === 'unassigned') {
        filtered = filtered.filter(ticket => !ticket.assigned_admin);
      } else {
        filtered = filtered.filter(ticket => ticket.assigned_admin === admin);
      }
    }
    
    setFilteredTickets(filtered);
  };

  const uniqueAdmins = Array.from(new Set(tickets
    .map(t => t.assigned_admin)
    .filter(admin => admin !== null))) as string[];

  return {
    tickets: filteredTickets,
    isLoading,
    filterTickets,
    uniqueAdmins
  };
}
