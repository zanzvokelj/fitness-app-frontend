'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { fetchActiveTicket, Ticket } from '@/lib/api/tickets';

const TicketBanner = dynamic(
  () => import('@/app/components/tickets/TicketBanner'),
  { ssr: false }
);

const ActiveBookingsList = dynamic(
  () => import('@/app/components/bookings/ActiveBookingsList'),
  { ssr: false }
);

const AiChat = dynamic(
  () => import('@/app/components/aiChat'),
  { ssr: false }
);

export default function DashboardPage() {
  const [refreshTicket, setRefreshTicket] = useState(0);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    fetchActiveTicket(1).then(setActiveTicket);
  }, [refreshTicket]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      <TicketBanner refreshKey={refreshTicket} />

      {/* 🤖 AI CHAT – samo če obstaja aktivna karta za center 1 */}
      {activeTicket && <AiChat />}

      <ActiveBookingsList
        onBookingChange={() => setRefreshTicket(v => v + 1)}
      />
    </main>
  );
}