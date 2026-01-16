import { apiRequest } from '@/lib/api/apiClient';

export type TicketPlan = {
  id: number;
  name: string;
  price_cents: number;
  duration_days: number | null;
  max_entries: number | null;
};

export function fetchTicketPlans(): Promise<TicketPlan[]> {
  return apiRequest<TicketPlan[]>('/api/v1/ticket-plans');
}

export function createCheckout(planId: number): Promise<{ url: string }> {
  return apiRequest<{ url: string }>('/api/v1/orders/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify({
      plan_id: planId,
    }),
  });
}