'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { apiRequest } from '@/lib/api/apiClient';
import BookingDetailView from './BookingsDetailView';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export type AdminBooking = {
  id: number;
  status: 'active' | 'cancelled' | 'waiting';
  user: {
    email: string;
  };
  session: {
    start_time: string;
    class_type: {
      name: string;
    };
  };
};

function groupByUser(bookings: AdminBooking[]) {
  return bookings.reduce<Record<string, AdminBooking[]>>((acc, b) => {
    const email = b.user.email;
    if (!acc[email]) acc[email] = [];
    acc[email].push(b);
    return acc;
  }, {});
}

export default function BookingsView() {
  const t = useTranslations('bookings');

  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [selected, setSelected] = useState<AdminBooking | null>(null);

  // filters
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [day, setDay] = useState<Date | undefined>();

  // UI state
  const [openUser, setOpenUser] = useState<string | null>(null);

  const loadBookings = useCallback(() => {
    const params = new URLSearchParams();
    if (email) params.append('email', email);
    if (status) params.append('status', status);
if (day) {
  const y = day.getFullYear();
  const m = String(day.getMonth() + 1).padStart(2, '0');
  const d = String(day.getDate()).padStart(2, '0');
  params.append('day', `${y}-${m}-${d}`);
}

    apiRequest<AdminBooking[]>(
      `/api/v1/admin/bookings?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    ).then(setBookings);
  }, [email, status, day]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const grouped = groupByUser(bookings);

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* LEFT */}
      <div className="col-span-1 bg-white rounded-xl shadow p-4 space-y-4">
        <h2 className="text-lg font-semibold">
          {t('title')}
        </h2>

        {/* FILTERS */}
        <div className="space-y-2">
          <input
            placeholder={t('searchEmail')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="">{t('allStatuses')}</option>
            <option value="active">{t('active')}</option>
            <option value="waiting">{t('waiting')}</option>
            <option value="cancelled">{t('cancelled')}</option>
          </select>

          {/* DATE PICKER */}
         <div className="border rounded-lg p-2 overflow-x-auto">
  <div className="min-w-65 max-w-full mx-auto">
    <DayPicker
      mode="single"
      selected={day}
      onSelect={setDay}
      className="rdp-responsive"
    />
  </div>

  {day && (
    <button
      onClick={() => setDay(undefined)}
      className="mt-2 text-xs text-blue-600 hover:underline"
    >
      {t('clearDate')}
    </button>
  )}
</div>
        </div>

        {/* USERS LIST */}
        <div className="space-y-2 pt-2">
          {Object.entries(grouped).map(([userEmail, userBookings]) => {
            const isOpen = openUser === userEmail;

            return (
              <div key={userEmail}>
                {/* USER HEADER */}
                <button
                  onClick={() =>
                    setOpenUser(isOpen ? null : userEmail)
                  }
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left
                    ${isOpen ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                >
                  <span className="font-semibold">
                    {userEmail}
                  </span>
                  <span className="text-sm">
                    {isOpen ? '▼' : '▶'}
                  </span>
                </button>

                {/* BOOKINGS */}
                {isOpen && (
                  <ul className="mt-1 ml-3 border-l pl-3 space-y-1">
                    {userBookings.map((b) => (
                      <li
                        key={b.id}
                        onClick={() => setSelected(b)}
                        className={`p-2 rounded cursor-pointer text-sm
                          ${
                            selected?.id === b.id
                              ? 'bg-blue-100'
                              : 'hover:bg-gray-100'
                          }`}
                      >
                        {b.session.class_type.name} ·{' '}
                        {new Date(
                          b.session.start_time
                        ).toLocaleString()}
                        <span
                          className={`ml-2 text-xs font-semibold
                            ${
                              b.status === 'active'
                                ? 'text-green-600'
                                : b.status === 'waiting'
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}
                        >
                          {t(b.status)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {bookings.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">
              {t('noBookings')}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="col-span-2">
        {selected ? (
          <BookingDetailView
            booking={selected}
            onUpdated={loadBookings}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            {t('select')}
          </div>
        )}
      </div>
    </div>
  );
}