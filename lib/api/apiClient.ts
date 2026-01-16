const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000';

export async function apiRequest<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  // 🔐 CENTRALIZED AUTH HANDLING
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');

    
      const currentPath = window.location.pathname;
      window.location.href = `/login?next=${encodeURIComponent(currentPath)}`;
    }

    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.detail ?? 'Request failed');
  }

  return res.json();
}