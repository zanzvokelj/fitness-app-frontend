'use client';

import { useTranslations } from 'next-intl';
import { apiRequest } from '@/lib/api/apiClient';
import { AdminBooking } from './BookingsView';

type Props = {
  booking: AdminBooking;
  onUpdated: () => void;
};

export default function BookingDetailView({ booking, onUpdated }: Props) {
  const t = useTranslations('bookings');

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">
      <h2 className="text-xl font-bold">
        {booking.user.email}
      </h2>

      <p className="text-sm text-gray-500">
        {booking.session.class_type.name} ·{' '}
        {new Date(booking.session.start_time).toLocaleString()}
      </p>

      <span
        className={`inline-block text-sm font-semibold ${
          booking.status === 'active'
            ? 'text-green-600'
            : booking.status === 'waiting'
            ? 'text-yellow-600'
            : 'text-red-600'
        }`}
      >
        {t(booking.status)}
      </span>

      {booking.status === 'active' && (
        <button
          className="btn-danger ml-2"
          onClick={async () => {
            if (!confirm(t('confirmCancel'))) return;

            await apiRequest(
              `/api/v1/admin/bookings/${booking.id}/cancel`,
              {
                method: 'PATCH',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
              }
            );

            onUpdated();
          }}
        >
          {t('cancel')}
        </button>
      )}
    </div>
  );
}