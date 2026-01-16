'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  fetchAdminTickets,
  fetchTicketPlans,
  type AdminTicket,
  type TicketPlan,
} from '@/lib/api/adminTickets';

type StatusFilter = 'all' | 'active' | 'inactive';

function isStatus(value: string): value is StatusFilter {
  return value === 'all' || value === 'active' || value === 'inactive';
}

export default function TicketsView() {
  const t = useTranslations('Ticket');

  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [plans, setPlans] = useState<TicketPlan[]>([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [email, setEmail] = useState('');
  const [planId, setPlanId] = useState<number | 'all'>('all');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // initial load
  useEffect(() => {
    Promise.all([
      fetchTicketPlans().then(setPlans),
      fetchAdminTickets({}).then(setTickets),
    ]).finally(() => setLoading(false));
  }, []);

  // refetch on filter change
  useEffect(() => {
    if (from && to && new Date(to) < new Date(from)) return;

    fetchAdminTickets({
      email: email || undefined,
      plan_id: planId === 'all' ? undefined : planId,
      status: status === 'all' ? undefined : status,
      from_date: from || undefined,
      to_date: to || undefined,
    }).then(setTickets);
  }, [email, planId, status, from, to]);

  if (loading) {
    return (
      <div className="text-gray-400">
        {t('loading')}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {t('title')}
      </h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          label={t('totalSold')}
          value={tickets.length}
        />
        <SummaryCard
          label={t('active')}
          value={tickets.filter(t => t.is_active).length}
        />
        <SummaryCard
          label={t('revenue')}
          value={
            (
              tickets.reduce(
                (sum, t) => sum + t.plan.price_cents,
                0
              ) / 100
            ).toFixed(2) + ' €'
          }
        />
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* EMAIL */}
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={t('filters.email')}
          className="input"
        />

        {/* PLAN */}
        <select
          value={planId}
          onChange={e =>
            setPlanId(
              e.target.value === 'all'
                ? 'all'
                : Number(e.target.value)
            )
          }
          className="input"
        >
          <option value="all">
            {t('filters.allPlans')}
          </option>
          {plans.map(plan => (
            <option key={plan.id} value={plan.id}>
              {plan.name}
            </option>
          ))}
        </select>

        {/* STATUS */}
        <select
          value={status}
          onChange={e => {
            const value = e.target.value;
            if (isStatus(value)) setStatus(value);
          }}
          className="input"
        >
          <option value="all">
            {t('filters.allStatuses')}
          </option>
          <option value="active">
            {t('filters.statusActive')}
          </option>
          <option value="inactive">
            {t('filters.statusInactive')}
          </option>
        </select>

        {/* FROM */}
        <input
          type="date"
          value={from}
          onChange={e => setFrom(e.target.value)}
          className="input"
          aria-label={t('filters.fromDate')}
        />

        {/* TO */}
        <input
          type="date"
          value={to}
          onChange={e => setTo(e.target.value)}
          className="input"
          aria-label={t('filters.toDate')}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">
                {t('table.user')}
              </th>
              <th className="p-3 text-left">
                {t('table.plan')}
              </th>
              <th className="p-3">
                {t('table.validUntil')}
              </th>
              <th className="p-3">
                {t('table.entries')}
              </th>
              <th className="p-3">
                {t('table.status')}
              </th>
            </tr>
          </thead>

          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id} className="border-t">
                <td className="p-3">
                  {ticket.user.email}
                </td>
                <td className="p-3">
                  {ticket.plan.name}
                </td>
                <td className="p-3 text-center">
                  {new Date(ticket.valid_until).toLocaleDateString()}
                </td>
                <td className="p-3 text-center">
                  {ticket.remaining_entries === null
                    ? t('unlimited')
                    : t('remainingEntries', {
                        count: ticket.remaining_entries,
                      })}
                </td>
                <td className="p-3 text-center">
                  {ticket.is_active
                    ? t('status.active')
                    : t('status.inactive')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="text-xs text-gray-400">
        {label}
      </div>
      <div className="text-xl font-bold">
        {value}
      </div>
    </div>
  );
}