'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { apiRequest } from '@/lib/api/apiClient';

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

type ClassType = {
  id: number;
  name: string;
};

export default function AddSessionModal({ onClose, onSuccess }: Props) {
  const t = useTranslations('admin.sessions');

  const [classTypes, setClassTypes] = useState<ClassType[]>([]);
  const [classTypeId, setClassTypeId] = useState<number>();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [capacity, setCapacity] = useState(10);

  useEffect(() => {
    apiRequest<ClassType[]>('/api/v1/class-types').then(setClassTypes);
  }, []);

  async function handleCreate() {
    const start_time = new Date(`${date}T${time}:00Z`);

    await apiRequest('/api/v1/admin/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        center_id: 1,
        class_type_id: classTypeId,
        start_time,
        capacity,
      }),
    });

    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="
          w-full max-w-md
          rounded-2xl bg-white
          shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]
          p-6 space-y-5
          animate-in fade-in zoom-in
        "
      >
        {/* TITLE */}
        <h2 className="text-xl font-semibold text-gray-900">
          {t('addSession')}
        </h2>

        {/* CLASS TYPE */}
        <select
          className="
            w-full h-12
            rounded-xl border border-gray-300
            px-4 text-sm
            bg-white
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
          defaultValue=""
          onChange={(e) => setClassTypeId(Number(e.target.value))}
        >
          <option value="" disabled>
            {t('selectClass')}
          </option>
          {classTypes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* DATE */}
        <input
          type="date"
          className="
            w-full h-12
            rounded-xl border border-gray-300
            px-4 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
          onChange={(e) => setDate(e.target.value)}
        />

        {/* TIME */}
        <input
          type="time"
          className="
            w-full h-12
            rounded-xl border border-gray-300
            px-4 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
          onChange={(e) => setTime(e.target.value)}
        />

        {/* CAPACITY */}
        <input
          type="number"
          min={1}
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
          className="
            w-full h-12
            rounded-xl border border-gray-300
            px-4 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="
              h-11 px-4
              rounded-xl
              text-sm font-medium
              text-gray-600
              hover:bg-gray-100
              transition
            "
          >
            {t('cancel')}
          </button>

          <button
            onClick={handleCreate}
            className="
              h-11 px-5
              rounded-xl
              bg-blue-600 text-white
              text-sm font-semibold
              hover:bg-blue-700
              transition
            "
          >
            {t('create')}
          </button>
        </div>
      </div>
    </div>
  );
}