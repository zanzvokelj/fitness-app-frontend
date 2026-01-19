'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

/* --------------------------------------------
 * Dynamic imports (client-only components)
 * -------------------------------------------- */
const TicketBanner = dynamic(
  () => import('@/app/components/tickets/TicketBanner'),
  { ssr: false }
);

const ActiveBookingsList = dynamic(
  () => import('@/app/components/bookings/ActiveBookingsList'),
  { ssr: false }
);

const AiFitnessCoach = dynamic(
  () => import('@/app/components/aiFitnessCoach'),
  { ssr: false }
);

/* --------------------------------------------
 * Dashboard Page
 * -------------------------------------------- */
export default function DashboardPage() {
  const [refreshTicket, setRefreshTicket] = useState<number>(0);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* 🎟️ Ticket status / upsell */}
      <TicketBanner refreshKey={refreshTicket} />

      {/* 🤖 AI Fitness Assistant */}
      <AiFitnessCoach />

      {/* 📅 Active bookings */}
      <ActiveBookingsList
        onBookingChange={() =>
          setRefreshTicket(prev => prev + 1)
        }
      />
    </main>
  );
}