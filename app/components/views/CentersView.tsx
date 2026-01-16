'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  fetchAdminCenters,
  createCenter,
  updateCenter,
  deactivateCenter,
  type AdminCenter,
} from '@/lib/api/adminCenters';

export default function CentersView() {
  const t = useTranslations('AdminCenters');

  const [centers, setCenters] = useState<AdminCenter[]>([]);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  // 🔁 central reload
  async function reload() {
    const data = await fetchAdminCenters();
    setCenters(data);
  }

  // initial load (lint-safe)
  useEffect(() => {
    let mounted = true;

    (async () => {
      const data = await fetchAdminCenters();
      if (mounted) {
        setCenters(data);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {t('title')}
      </h1>

      {/* ADD CENTER */}
      <div className="flex gap-2 mb-6">
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder={t('newPlaceholder')}
          className="input flex-1"
        />

        <button
          className="btn-primary"
          disabled={!newName.trim()}
          onClick={async () => {
            await createCenter(newName);
            setNewName('');
            await reload();
          }}
        >
          {t('add')}
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow divide-y">
        {centers.map(center => (
          <div
            key={center.id}
            className="p-4 flex items-center justify-between gap-4"
          >
            {editingId === center.id ? (
              <input
                value={editingName}
                onChange={e => setEditingName(e.target.value)}
                className="input flex-1"
              />
            ) : (
              <div>
                <div className="font-medium">
                  {center.name}
                </div>
                <div className="text-xs text-gray-400">
                  {center.is_active
                    ? t('active')
                    : t('inactive')}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              {editingId === center.id ? (
                <>
                  <button
                    className="btn-primary"
                    onClick={async () => {
                      await updateCenter(center.id, editingName);
                      setEditingId(null);
                      await reload();
                    }}
                  >
                    {t('save')}
                  </button>

                  <button
                    className="btn-secondary"
                    onClick={() => setEditingId(null)}
                  >
                    {t('cancel')}
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setEditingId(center.id);
                      setEditingName(center.name);
                    }}
                  >
                    {t('edit')}
                  </button>

                  {center.is_active && (
                    <button
                      className="btn-danger"
                      onClick={async () => {
                        if (!confirm(t('confirmDeactivate'))) return;
                        await deactivateCenter(center.id);
                        await reload();
                      }}
                    >
                      {t('deactivate')}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}