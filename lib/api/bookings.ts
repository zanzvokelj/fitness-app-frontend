import { apiRequest } from '@/lib/api/apiClient';
import type { Session } from '@/lib/api/sessions';

export type Booking = {
  id: number;
  session_id: number;
  created_at: string;
  status: 'active' | 'waiting';
  session: Session;
};
export async function fetchMyBookings(): Promise<Booking[]> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('access_token')
      : null;

  return apiRequest<Booking[]>('/api/v1/bookings/me', {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : undefined,
  });
}
export async function createBooking(sessionId: number): Promise<Booking> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('access_token')
      : null;

  return apiRequest<Booking>(
    `/api/v1/bookings?session_id=${sessionId}`,
    {
      method: 'POST',
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : undefined,
    },
  );
}
export async function cancelBooking(bookingId: number): Promise<void> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('access_token')
      : null;

  await apiRequest(
    `/api/v1/bookings/${bookingId}`,
    {
      method: 'DELETE',
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : undefined,
    },
  );
}