'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

import LanguageSwitcher from './LanguageSwitcher';
import Navbar from './Navbar';
import { BurgerMenu } from './BurgerMenu';

type Props = {
  children: ReactNode;
};

export default function AppShell({ children }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LanguageSwitcher />
      <Navbar
  onMenuToggle={() => setMenuOpen(prev => !prev)}
  menuOpen={menuOpen}
/>

      {/* ===== MOBILE / TABLET (< 1024px) ===== */}
      {menuOpen && (
        <div className="block lg:hidden">
          <BurgerMenu />
        </div>
      )}

      {/* ===== DESKTOP (>= 1024px) ===== */}
      <div className="hidden lg:flex flex-1">
        {menuOpen && (
          <aside className="w-64 shrink-0">
            <BurgerMenu />
          </aside>
        )}

        <main className="flex-1 px-6 transition-all duration-300">
          {children}
        </main>
      </div>

      {/* ===== MOBILE CONTENT ===== */}
      <main className="block lg:hidden flex-1 px-4">
        {children}
      </main>
    </div>
  );
}