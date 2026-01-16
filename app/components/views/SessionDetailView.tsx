'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { apiRequest } from '@/lib/api/apiClient';
import { AdminSession } from './SessionsView';

type Props = {
  session: AdminSession;
  onUpdated: () => void;
};

export default function SessionDetailView({ session, onUpdated }: Props) {
  const t = useTranslations('admin.sessions');
  const [capacity, setCapacity] = useState(session.capacity);

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">
      <h2 className="text-xl font-bold">
        {session.class_type.name}
      </h2>

      <p className="text-sm text-gray-500">
        {new Date(session.start_time).toLocaleString()}
      </p>

      {/* CAPACITY */}
      <div className="flex items-center gap-3">
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
          className="w-24 rounded-lg border px-3 py-2"
        />

        <button
          className="btn-warning"
          onClick={async () => {
            await apiRequest(
              `/api/v1/admin/sessions/${session.id}/capacity`,
              {
                method: 'PATCH',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ capacity }),
              }
            );
            onUpdated();
          }}
        >
          {t('saveCapacity')}
        </button>
      </div>

      {/* CANCEL */}
      {session.is_active && (
        <button
          className="btn-danger"
          onClick={async () => {
            if (!confirm(t('confirmCancel'))) return;

            await apiRequest(
              `/api/v1/admin/sessions/${session.id}/cancel`,
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
          {t('cancelSession')}
        </button>
      )}
    </div>
  );
}