'use client';

import dynamic from 'next/dynamic';

const SchedulePageClient = dynamic(
  () => import('./SchedulePageClient'),
  { ssr: false }
);

export default function SchedulePage() {
  return <SchedulePageClient />;
}