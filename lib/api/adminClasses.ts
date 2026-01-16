import { apiRequest } from '@/lib/api/apiClient';

export type AdminClassType = {
  id: number;
  name: string;
  duration: number;
  is_active: boolean;
};

export function fetchAdminClassTypes(): Promise<AdminClassType[]> {
  return apiRequest('/api/v1/admin/class-types', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
}

export function createClassType(data: {
  name: string;
  duration: number;
}) {
  return apiRequest('/api/v1/admin/class-types', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export function updateClassType(
  id: number,
  data: { name: string; duration: number }
) {
  return apiRequest(`/api/v1/admin/class-types/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export function deactivateClassType(id: number) {
  return apiRequest(`/api/v1/admin/class-types/${id}/deactivate`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
}