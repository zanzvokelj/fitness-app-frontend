'use client';

import { useEffect, useState } from 'react';
import { fetchSessions, type Session } from '@/lib/api/sessions';
import { useCenter } from '@/app/providers/CenterProvider';
import ScheduleCalendar from '@/app/components/schedule/ScheduleCalendar';
import WeekSchedule from '@/app/components/schedule/WeekSchedule';
import { fetchMyBookings, type Booking } from '@/lib/api/bookings';

function toISO(date: Date) {
  return date.toISOString().split('T')[0];
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export default function SchedulePageClient() {
  const { selectedCenter } = useCenter();
  const [anchorDate, setAnchorDate] = useState(() => new Date());
  const [sessions, setSessions] = useState<Session[]>([]);

  const [myBookings, setMyBookings] = useState<Booking[]>([]);

useEffect(() => {
  if (!selectedCenter) return;

  fetchMyBookings().then(setMyBookings);
}, [selectedCenter]);

  useEffect(() => {
    if (!selectedCenter) return;

    Promise.all(
      Array.from({ length: 7 }).map((_, i) =>
        fetchSessions({
          centerId: selectedCenter.id,
          day: toISO(addDays(anchorDate, i - 3)),
        }),
      ),
    ).then(results => {
      setSessions(results.flat());
    });
  }, [selectedCenter, anchorDate]);

  if (!selectedCenter) return null;

  async function refreshAll() {
  const bookings = await fetchMyBookings();
  setMyBookings(bookings);

  const results = await Promise.all(
    Array.from({ length: 7 }).map((_, i) =>
      fetchSessions({
        centerId: selectedCenter!.id,
        day: toISO(addDays(anchorDate, i - 3)),
      }),
    ),
  );
  setSessions(results.flat());
}

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <ScheduleCalendar
        selectedDate={anchorDate}
        onSelectDay={setAnchorDate}
      />

      <WeekSchedule
  anchorDate={anchorDate}
  sessions={sessions}
  myBookings={myBookings}
  onChange={refreshAll}
/>
    </main>
  );
}