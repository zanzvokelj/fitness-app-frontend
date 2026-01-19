'use client';

import {
  createContext,
  useContext,
  useState,
} from 'react';
import { loginUser } from '@/lib/api/auth';

type AuthContextType = {
  isAuthenticated: boolean;
  accessToken: string | null;
  email: string | null;
  
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);




export function AuthProvider({ children }: { children: React.ReactNode }) {


const [email, setEmail] = useState<string | null>(() => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('user_email');
});

  const [accessToken, setAccessToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  });

async function login(email: string, password: string) {
  const tokens = await loginUser(email, password);

  localStorage.setItem('access_token', tokens.access_token);
  localStorage.setItem('refresh_token', tokens.refresh_token);
  localStorage.setItem('user_email', email);

  setAccessToken(tokens.access_token);
  setEmail(email);
}
function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('ai_chat_messages');
  setAccessToken(null);
}

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(accessToken),
        accessToken,
        email,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}