'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const TicketBanner = dynamic(
  () => import('@/app/components/tickets/TicketBanner'),
  { ssr: false }
);

const ActiveBookingsList = dynamic(
  () => import('@/app/components/bookings/ActiveBookingsList'),
  { ssr: false }
);

export default function DashboardPage() {
  const [refreshTicket, setRefreshTicket] = useState(0);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <TicketBanner refreshKey={refreshTicket} />
      <ActiveBookingsList
        onBookingChange={() =>
          setRefreshTicket(v => v + 1)
        }
      />
    </main>
  );
}