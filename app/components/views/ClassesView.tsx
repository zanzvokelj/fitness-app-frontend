'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  fetchAdminClassTypes,
  createClassType,
  updateClassType,
  deactivateClassType,
  type AdminClassType,
} from '@/lib/api/adminClasses';

export default function ClassesView() {
  const t = useTranslations('AdminClasses');

  const [classes, setClasses] = useState<AdminClassType[]>([]);
  const [newName, setNewName] = useState('');
  const [newDuration, setNewDuration] = useState<number>(60);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingDuration, setEditingDuration] = useState<number>(60);

  async function reload() {
    const data = await fetchAdminClassTypes();
    setClasses(data);
  }

  useEffect(() => {
    let mounted = true;

    (async () => {
      const data = await fetchAdminClassTypes();
      if (mounted) setClasses(data);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          {t('title')}
        </h1>
        <p className="text-sm text-gray-500">
          Upravljanje vrst vadb in trajanj
        </p>
      </div>

      {/* ADD CLASS */}
      <div className="bg-white rounded-xl shadow p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
       <input
  value={newName}
  onChange={e => setNewName(e.target.value)}
  placeholder={t('name')}
  className="
    input
    border-2 border-gray-300
    focus:border-blue-500
    focus:ring-2 focus:ring-blue-200
  "
/>

<input
  type="number"
  min={1}
  value={newDuration}
  onChange={e => setNewDuration(Number(e.target.value))}
  className="
    input
    border-2 border-gray-300
    focus:border-blue-500
    focus:ring-2 focus:ring-blue-200
  "
  placeholder={t('durationLabel')}
/>

        <div className="md:col-span-2 flex justify-end">
          <button
            className="btn-primary px-6"
            disabled={!newName.trim()}
            onClick={async () => {
              await createClassType({
                name: newName,
                duration: newDuration,
              });
              setNewName('');
              setNewDuration(60);
              await reload();
            }}
          >
            + {t('add')}
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow divide-y">
        {classes.map(c => {
          const isEditing = editingId === c.id;

          return (
            <div
              key={c.id}
              className="p-4 flex items-center justify-between gap-4"
            >
              {/* LEFT */}
              <div className="flex-1 space-y-1">
                {isEditing ? (
                  <div className="flex gap-2">
                    <input
                      value={editingName}
                      onChange={e => setEditingName(e.target.value)}
                      className="input flex-1"
                    />
                    <input
                      type="number"
                      value={editingDuration}
                      onChange={e =>
                        setEditingDuration(Number(e.target.value))
                      }
                      className="input w-28 border-2 border-sky-500 rounded-lg"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900">
                        {c.name}
                      </span>

                      <span
                        className={`
                          text-xs px-2 py-0.5 rounded-full
                          ${
                            c.is_active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-200 text-gray-600'
                          }
                        `}
                      >
                        {c.is_active
                          ? t('active')
                          : t('inactive')}
                      </span>
                    </div>

                    <div className="text-sm text-gray-500">
                      ⏱ {t('duration', { min: c.duration })}
                    </div>
                  </>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 shrink-0">
                {isEditing ? (
                  <>
                    <button
                      className="btn-primary"
                      onClick={async () => {
                        await updateClassType(c.id, {
                          name: editingName,
                          duration: editingDuration,
                        });
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
                        setEditingId(c.id);
                        setEditingName(c.name);
                        setEditingDuration(c.duration);
                      }}
                    >
                      {t('edit')}
                    </button>

                    {c.is_active && (
                      <button
                        className="btn-danger"
                        onClick={async () => {
                          if (!confirm(t('confirmDeactivate'))) return;
                          await deactivateClassType(c.id);
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
          );
        })}
      </div>
    </div>
  );
}