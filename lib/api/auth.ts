import { apiRequest } from './apiClient';

export type RegisterPayload = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  id: number;
  email: string;
  role: string;
};

export function registerUser(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  return apiRequest<RegisterResponse>(
    '/api/v1/auth/register',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
}


export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  token_type: 'bearer';
};

export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
    {
      method: 'POST',
      body: formData,
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.detail ?? 'Login failed');
  }

  return res.json();
}