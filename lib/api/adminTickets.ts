import { apiRequest } from '@/lib/api/apiClient';

export type TicketPlan = {
  id: number;
  name: string;
  price_cents: number;
  duration_days: number | null;
};

export type AdminTicket = {
  id: number;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  remaining_entries: number | null;

  plan: {
    id: number;
    name: string;
    price_cents: number;
    duration_days: number | null;
    max_entries: number | null;
  };

  user: {
    id: number;
    email: string;
  };
};

export function fetchAdminTickets(params?: {
  email?: string;
  plan_id?: number;
  status?: 'active' | 'inactive';
  from_date?: string;
  to_date?: string;
}): Promise<AdminTicket[]> {
  const query = new URLSearchParams();

  if (params?.email) query.append('email', params.email);
  if (params?.plan_id) query.append('plan_id', String(params.plan_id));
  if (params?.status) query.append('status', params.status);
  if (params?.from_date) query.append('from_date', params.from_date);
  if (params?.to_date) query.append('to_date', params.to_date);

  return apiRequest(`/api/v1/admin/tickets?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
}

export function fetchTicketPlans(): Promise<TicketPlan[]> {
  return apiRequest<TicketPlan[]>('/api/v1/admin/ticket-plans', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
}

export function assignTicket(data: {
  user_id: number;
  center_id: number;
  plan_id: number;
}) {
  return apiRequest('/api/v1/admin/tickets/assign', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export function deactivateTicket(ticketId: number) {
  return apiRequest(
    `/api/v1/admin/tickets/${ticketId}/deactivate`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    }
  );
}