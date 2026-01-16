'use client';

import { useState } from 'react';
import AdminSidebar from '@/app/components/admin/AdminSidebar';
import UsersView from '@/app/components/views/UsersView';
import SessionsView from '@/app/components/views/SessionsView';
import BookingsView from '@/app/components/views/BookingsView';
import TicketsView from '@/app/components/views/TicketsView';
import CentersView from '@/app/components/views/CentersView';
import ClassesView from '@/app/components/views/ClassesView';


export type AdminView =
  | 'dashboard'
  | 'users'
  | 'tickets'
  | 'sessions'
  | 'bookings'
  | 'centers'
  | 'classes';

export default function AdminPage() {
  const [view, setView] = useState<AdminView>('dashboard');

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <AdminSidebar
        active={view}
        onChange={setView}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 bg-gray-50">
        {view === 'dashboard' && (
          <div className="text-gray-400">
            Dashboard coming soon
          </div>
        )}

        {view === 'users' && <UsersView />}

        {view === 'tickets' && <TicketsView />}

        {view === 'sessions' && <SessionsView />}

        {view === 'bookings' && <BookingsView />}

        {view === 'centers' && <CentersView />}
{view === 'classes' && <ClassesView />}
      </main>
    </div>
  );
}