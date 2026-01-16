'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { apiRequest } from '@/lib/api/apiClient';
import SessionDetailView from './SessionDetailView';
import AddSessionModal from './AddSessionModal';

export type AdminSession = {
  id: number;
  start_time: string;
  end_time: string;
  capacity: number;
  is_active: boolean;
  class_type: {
    name: string;
  };
};

export default function SessionsView() {
  const t = useTranslations('admin.sessions');

  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [selected, setSelected] = useState<AdminSession | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  // filters
  const [classType, setClassType] = useState('');
  const [day, setDay] = useState('');
  const [showPast, setShowPast] = useState(false);

  const loadSessions = useCallback(() => {
    const params = new URLSearchParams();
    if (day) params.append('day', day);

    apiRequest<AdminSession[]>(
      `/api/v1/admin/sessions?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    ).then(setSessions);
  }, [day]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  // unique class types for dropdown
  const classTypes = Array.from(
    new Set(sessions.map((s) => s.class_type.name))
  );

  const now = new Date();

  const filteredSessions = sessions
    // ⏳ upcoming / past logic
    .filter((s) => {
      const end = new Date(s.end_time);
      return showPast ? end < now : end >= now;
    })
    // 🧪 class filter
    .filter((s) =>
      classType ? s.class_type.name === classType : true
    )
    // ⬆️ upcoming asc / past desc
    .sort((a, b) => {
      const aTime = new Date(a.start_time).getTime();
      const bTime = new Date(b.start_time).getTime();
      return showPast ? bTime - aTime : aTime - bTime;
    });

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="col-span-1 bg-white rounded-xl shadow p-4 space-y-4">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {t('title')}
            </h2>

            <button
              className="btn-primary"
              onClick={() => setShowAdd(true)}
            >
              {t('addSession')}
            </button>
          </div>

          {/* FILTERS */}
          <div className="space-y-2">
            <select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            >
              <option value="">
                {t('allClasses')}
              </option>
              {classTypes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />

            {/* ✅ SHOW PAST */}
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={showPast}
                onChange={(e) => setShowPast(e.target.checked)}
              />
              {t('showPast')}
            </label>
          </div>

          {/* SESSIONS LIST */}
          <ul className="space-y-2 pt-2">
            {filteredSessions.map((s) => (
              <li
                key={s.id}
                onClick={() => setSelected(s)}
                className={`p-3 rounded cursor-pointer transition
                  ${
                    selected?.id === s.id
                      ? 'bg-blue-100'
                      : 'hover:bg-gray-100'
                  }`}
              >
                <div className="font-medium">
                  {s.class_type.name}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(s.start_time).toLocaleString()}
                </div>
              </li>
            ))}

            {filteredSessions.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">
                {showPast
                  ? t('noPastSessions')
                  : t('noSessions')}
              </p>
            )}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="col-span-2">
          {selected ? (
            <SessionDetailView
              session={selected}
              onUpdated={loadSessions}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              {t('select')}
            </div>
          )}
        </div>
      </div>

      {showAdd && (
        <AddSessionModal
          onClose={() => setShowAdd(false)}
          onSuccess={loadSessions}
        />
      )}
    </>
  );
}