import { apiRequest } from '@/lib/api/apiClient';

export function changeUserRole(
  userId: number,
  role: 'user' | 'admin'
) {
  return apiRequest(
    `/api/v1/admin/users/${userId}/role?role=${role}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    }
  );
}

export function deactivateUser(userId: number) {
  return apiRequest(
    `/api/v1/admin/users/${userId}/deactivate`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    }
  );
}