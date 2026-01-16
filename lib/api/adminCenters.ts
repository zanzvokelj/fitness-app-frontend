import { apiRequest } from '@/lib/api/apiClient';

export type AdminCenter = {
  id: number;
  name: string;
  is_active: boolean;
};

export function fetchAdminCenters(): Promise<AdminCenter[]> {
  return apiRequest('/api/v1/admin/centers', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
}

export function createCenter(name: string) {
  return apiRequest('/api/v1/admin/centers', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
}

export function updateCenter(id: number, name: string) {
  return apiRequest(`/api/v1/admin/centers/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
}

export function deactivateCenter(id: number) {
  return apiRequest(`/api/v1/admin/centers/${id}/deactivate`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
}