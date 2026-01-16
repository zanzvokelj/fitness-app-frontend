'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { apiRequest } from '@/lib/api/apiClient';
import UserDetailView, { UserRole } from './UserDetailView';

export type AdminUser = {
  id: number;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
};

export default function UsersView() {
  const t = useTranslations('admin.users');

  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  /* LOAD USERS */
  const loadUsers = useCallback(async () => {
    const data = await apiRequest<AdminUser[]>('/api/v1/admin/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    setUsers(data);
  }, []);

useEffect(() => {
  async function loadUsers() {
    const data = await apiRequest<AdminUser[]>('/api/v1/admin/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    setUsers(data);
  }

  loadUsers();
}, []);

  /* DERIVED selectedUser (brez setState!) */
  const selectedUser =
    selectedUserId !== null
      ? users.find((u) => u.id === selectedUserId) ?? null
      : null;

  /* FILTER */
  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* LEFT – USERS LIST */}
      <div className="col-span-1 bg-white rounded-xl shadow p-4 space-y-4">
        <h2 className="text-lg font-semibold">{t('title')}</h2>

        {/* SEARCH */}
        <input
          type="text"
          placeholder={t('search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg bg-gray-50 border px-3 py-2 text-sm"
        />

        {/* USERS LIST */}
        <ul className="space-y-2">
          {filteredUsers.map((u) => (
            <li
              key={u.id}
              onClick={() => setSelectedUserId(u.id)}
              className={`p-3 rounded cursor-pointer transition ${
                selectedUserId === u.id
                  ? 'bg-blue-100'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="font-medium">{u.email}</div>
              <div className="text-sm text-gray-500">
                {u.role} · {u.is_active ? t('active') : t('disabled')}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT – USER DETAIL */}
      <div className="col-span-2">
        {selectedUser ? (
          <UserDetailView
            user={selectedUser}
            onUserUpdated={loadUsers} // samo reload, brez side-effecta
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            {t('selectUser')}
          </div>
        )}
      </div>
    </div>
  );
}