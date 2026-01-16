'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  fetchMyBookings,
  cancelBooking,
  type Booking,
} from '@/lib/api/bookings';

export default function ActiveBookingsList({
  onBookingChange,
}: {
  onBookingChange?: () => void;
}) {
  const t = useTranslations('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // 🔹 initial load (BREZ setState wrapperja)
  useEffect(() => {
    let mounted = true;

    (async () => {
      const data = await fetchMyBookings();
      if (mounted) setBookings(data);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // 🔹 reload helper (uporablja se iz buttona)
  async function reload() {
    setBookings(await fetchMyBookings());
  }

  if (bookings.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-400">
        {t('noBookings')}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">
        {t('myBookings')}
      </h2>

      <div className="space-y-4">
        {bookings.map(b => {
          const start = new Date(b.session.start_time);

          return (
            <div
              key={b.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-start justify-between gap-4"
            >
              {/* LEFT */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">
                    {b.session.class_type.name}
                  </h3>

                  {b.status === 'waiting' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                      ⏳ {t('waiting')}
                    </span>
                  )}

                  {b.status === 'active' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      🟢 {t('active')}
                    </span>
                  )}
                </div>

                <div className="text-sm text-gray-500 mt-1">
                  {start.toLocaleDateString('sl-SI', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                  {' • '}
                  {start.toLocaleTimeString('sl-SI', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              {/* RIGHT */}
              <button
                disabled={loadingId === b.id}
                onClick={async () => {
                  setLoadingId(b.id);
                  await cancelBooking(b.id);
                  setLoadingId(null);
                  await reload();
                  onBookingChange?.(); // 🔑 osveži TicketBanner
                }}
                className="
                  inline-flex items-center justify-center
                  px-4 py-1.5
                  rounded-full
                  text-sm font-semibold
                  border border-red-300
                  text-red-600
                  hover:bg-red-50
                  hover:border-red-400
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition
                "
              >
                {loadingId === b.id ? '…' : t('cancel')}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}