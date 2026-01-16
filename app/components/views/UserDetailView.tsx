'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { apiRequest } from '@/lib/api/apiClient';
import AssignTicketModal from '@/app/components/admin/AssignTicketModal';
import { deactivateTicket } from '@/lib/api/adminTickets';
import { changeUserRole, deactivateUser } from '@/lib/api/adminUsers';

export type UserRole = 'user' | 'admin';

type Props = {
  user: {
    id: number;
    email: string;
    role: UserRole;   
    is_active: boolean;
    
  };
  onUserUpdated?: () => void;
};

type AdminTicket = {
  id: number;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  remaining_entries: number | null;
  plan: {
    name: string;
  };
};

export default function UserDetailView({ user, onUserUpdated }: Props) {
  const t = useTranslations('admin.userDetail');
  const u = useTranslations('admin.users');
const [role, setRole] = useState<UserRole>(user.role);
  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [showAssign, setShowAssign] = useState(false);
  const loadTickets = useCallback(() => {
    apiRequest<AdminTicket[]>(
      `/api/v1/admin/users/${user.id}/tickets`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    ).then(setTickets);
  }, [user.id]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  return (
    <>
      {/* CARD */}
      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        {/* USER INFO */}
     {/* USER INFO */}
<div>
  <h2 className="text-xl font-bold">{user.email}</h2>

  <p className="text-sm text-gray-500 flex items-center gap-2">
    {/* ROLE */}
    <span>
      {u('role')}:{' '}
      <span className="font-medium text-sky-500">
        {user.role}
      </span>
    </span>

    <span>·</span>

    {/* STATUS */}
    <span>
      {u('status')}:{' '}
      <span
        className={`font-medium ${
          user.is_active
            ? 'text-green-600'
            : 'text-red-600'
        }`}
      >
        {user.is_active ? u('active') : u('disabled')}
      </span>
    </span>
  </p>
</div>

        {/* TICKETS */}
        <div>
          <h3 className="font-semibold mb-2">
            {t('tickets')}
          </h3>

          {tickets.length === 0 ? (
            <p className="text-gray-400">
              {t('noTickets')}
            </p>
          ) : (
            <ul className="space-y-2">
              {tickets.map((ticket) => (
                <li
                  key={ticket.id}
                  className="border rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                  <div className="font-medium flex items-center gap-2">
  {ticket.plan.name}

{ticket.is_active && ticket.remaining_entries !== null && (
  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
    Preostalih ({ticket.remaining_entries}) obiskov
  </span>
)}

</div>
                    <div className="text-sm text-gray-500">
                      {t('valid')}:{' '}
                      {new Date(ticket.valid_from).toLocaleDateString()} →{' '}
                      {new Date(ticket.valid_until).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-semibold ${
                        ticket.is_active
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }`}
                    >
                      {ticket.is_active
                        ? t('active')
                        : t('inactive')}
                    </span>

                    {ticket.is_active && (
                      <button
                        onClick={async () => {
                          await deactivateTicket(ticket.id);
                          loadTickets();
                        }}
                        className="
                          text-sm px-3 py-1 rounded-lg
                          border border-red-300 text-red-600
                          hover:bg-red-50
                        "
                      >
                        {t('deactivateTicket')}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button
            className="btn-primary"
            onClick={() => setShowAssign(true)}
          >
            {t('assignTicket')}
          </button>

       {/* CHANGE ROLE */}
<div className="flex items-center gap-3">
<select
  value={role}
  onChange={(e) =>
    setRole(e.target.value as UserRole)
  }
  className="
    h-10
    px-4
    rounded-lg
    border border-gray-300
    bg-white
    text-sm font-medium
    text-gray-800
    shadow-sm
    transition
    hover:border-gray-400
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:border-blue-500
  "
>
  <option value="user">
    {t('roleUser')}
  </option>
  <option value="admin">
    {t('roleAdmin')}
  </option>
</select>

<button
  className="btn-warning"
  disabled={role === user.role}
  onClick={async () => {
    await changeUserRole(user.id, role);

    alert(t('roleChanged'));

    onUserUpdated?.(); // ⬅️ TO MANJKA
  }}
>
  {t('saveRole')}
</button>
</div>

          {user.is_active && (
            <button
              className="btn-danger"
              onClick={async () => {
                if (!confirm(t('confirmDeactivate'))) return;
                await deactivateUser(user.id);
                alert(t('userDeactivated'));
              }}
            >
              {t('deactivateUser')}
            </button>
          )}
        </div>
      </div>

      {/* ASSIGN TICKET MODAL */}
      {showAssign && (
        <AssignTicketModal
          userId={user.id}
          centerId={1}
          onClose={() => setShowAssign(false)}
          onSuccess={loadTickets}
        />
      )}
    </>
  );
}