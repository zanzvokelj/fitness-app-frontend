import { apiRequest } from '@/lib/api/apiClient';

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