import { apiRequest } from '@/lib/api/apiClient';

export type Center = {
  id: number;
  name: string;
};

export function fetchCenters(): Promise<Center[]> {
  return apiRequest<Center[]>('/api/v1/centers');
}