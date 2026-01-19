'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { fetchActiveTicket, Ticket } from '@/lib/api/tickets';
import { useCenter } from '@/app/providers/CenterProvider';

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
  const { selectedCenter } = useCenter();
  const [refreshTicket, setRefreshTicket] = useState(0);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    if (!selectedCenter) return;

    fetchActiveTicket(selectedCenter.id).then(setActiveTicket);
  }, [selectedCenter, refreshTicket]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      <TicketBanner refreshKey={refreshTicket} />

      {/* 🤖 AI CHAT – samo za center 1 + aktivna karta */}
      {selectedCenter?.id === 1 && activeTicket && <AiChat />}

      <ActiveBookingsList
        onBookingChange={() => setRefreshTicket(v => v + 1)}
      />
    </main>
  );
}