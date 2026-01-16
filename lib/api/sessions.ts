import { apiRequest } from '@/lib/api/apiClient';

export type ClassType = {
  id: number;
  name: string;
  description: string | null;
  duration: number;
  center_id: number;
};

export type Session = {
  id: number;
  center_id: number;
  class_type_id: number;
  start_time: string; // ISO
  end_time: string;   // ISO
  capacity: number;
  is_active: boolean;
  class_type: ClassType;
  booked_count: number;
};

type FetchSessionsParams = {
  centerId: number;
  day?: string; // 'YYYY-MM-DD'
};

/**
 * Fetch sessions for a given center, optionally filtered by day.
 * Backend: GET /api/v1/sessions?center_id=1&day=2026-01-13
 */
export function fetchSessions(params: FetchSessionsParams): Promise<Session[]> {
  const qs = new URLSearchParams();
  qs.set('center_id', String(params.centerId));
  if (params.day) qs.set('day', params.day);

  // Auth header only on client (no SSR crash)
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('access_token')
      : null;

  return apiRequest<Session[]>(`/api/v1/sessions?${qs.toString()}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}