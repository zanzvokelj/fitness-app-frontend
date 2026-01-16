import { apiRequest } from '@/lib/api/apiClient';

/* =======================
   TYPES
======================= */

export type AdminStats = {
  kpis: {
    users: number;
    active_tickets: number;
    bookings: number;
    revenue: number;
  };

  users_by_day: {
    day: string;
    count: number;
  }[];

  revenue_by_day: {
    day: string;
    revenue: number;
  }[];

  bookings_by_weekday: {
    weekday: number;
    count: number;
  }[];

  popular_classes: {
    name: string;
    count: number;
  }[];
};

/* =======================
   API CALLS
======================= */

export async function checkIsAdmin(): Promise<boolean> {
  try {
    await apiRequest('/api/v1/admin/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    return true;
  } catch {
    return false;
  }
}

export function fetchAdminStats(): Promise<AdminStats> {
  return apiRequest<AdminStats>('/api/v1/admin/stats', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
}