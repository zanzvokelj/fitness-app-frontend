import { apiRequest } from '@/lib/api/apiClient';
import type { TicketPlan } from '@/lib/api/ticketPlans';
export type Ticket = {
  id: number;
  type: string;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  remaining_entries: number | null;
  plan: TicketPlan;
};

export function fetchActiveTicket(
  centerId: number
): Promise<Ticket | null> {
  return apiRequest<Ticket | null>(
    `/api/v1/tickets/me/active?center_id=${centerId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    }
  );
}