'use client';

import {
  createContext,
  useContext,
  useState,
} from 'react';

type Center = {
  id: number;
  name: string;
};

type CenterContextType = {
  selectedCenter: Center | null;
  selectCenter: (center: Center) => void;
  clearCenter: () => void;
};

const CenterContext = createContext<CenterContextType | undefined>(undefined);

export function CenterProvider({ children }: { children: React.ReactNode }) {
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(() => {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem('selected_center');
    return stored ? JSON.parse(stored) : null;
  });

  function selectCenter(center: Center) {
    setSelectedCenter(center);
    localStorage.setItem('selected_center', JSON.stringify(center));
  }

  function clearCenter() {
    setSelectedCenter(null);
    localStorage.removeItem('selected_center');
  }

  return (
    <CenterContext.Provider
      value={{ selectedCenter, selectCenter, clearCenter }}
    >
      {children}
    </CenterContext.Provider>
  );
}

export function useCenter() {
  const ctx = useContext(CenterContext);
  if (!ctx) {
    throw new Error('useCenter must be used inside CenterProvider');
  }
  return ctx;
}