'use client';

import type { Session } from '@/lib/api/sessions';
import SessionCard from './SessionCard';
import { useTranslations } from 'next-intl';
import { Booking } from '@/lib/api/bookings';

type Props = {
  anchorDate: Date;
  sessions: Session[];
  myBookings: Booking[];
  onChange: () => void;
};

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function sameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

export default function WeekSchedule({ anchorDate, sessions, myBookings, onChange }: Props) {
  const t = useTranslations('Schedule');

  const days = Array.from({ length: 7 }).map((_, i) =>
    addDays(anchorDate, i - 3),
  );

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-7 gap-4">
      {days.map(day => {
        const daySessions = sessions.filter(s =>
          sameDay(new Date(s.start_time), day),
        );

        return (
          <div key={day.toISOString()} className="border-t pt-2">
            {/* DAY HEADER */}
            <div className="mb-2 text-sm font-semibold text-gray-700">
              {t(`days.${day.getDay()}`)} {day.getDate()}
            </div>

            {daySessions.length === 0 ? (
              <div className="text-sm text-gray-400">
                {t('noSessions')}
              </div>
            ) : (
              daySessions.map(s => (
  <SessionCard
    key={s.id}
    session={s}
    myBooking={myBookings.find(
      (b: Booking) => b.session.id === s.id
    )}
    onChange={onChange}
    />
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}