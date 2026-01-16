'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { fetchActiveTicket, type Ticket } from '@/lib/api/tickets';
import { useCenter } from '@/app/providers/CenterProvider';

export default function TicketBanner({
  refreshKey,
}: {
  refreshKey?: number;
}) {
  const t = useTranslations('Ticket');
  const { selectedCenter } = useCenter();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    if (!selectedCenter) return;
    fetchActiveTicket(selectedCenter.id).then(setTicket);
  }, [selectedCenter, refreshKey]); // 🔑 TO JE KLJUČ

  if (!selectedCenter) return null;

  const isUnlimited = ticket?.remaining_entries === null;

  return (
    <div
      className={`
        w-full rounded-xl px-6 py-4 mb-6 text-white
        ${
          ticket
            ? 'bg-linear-to-r from-emerald-500 to-emerald-600'
            : 'bg-linear-to-r from-gray-500 to-gray-600'
        }
      `}
    >
      {ticket ? (
        <div className="text-center space-y-1">
          <div className="text-sm opacity-90">
            {t('validUntil')}
          </div>

          <div className="text-xl font-bold">
            {new Date(ticket.valid_until).toLocaleDateString()}
          </div>

          <div className="text-sm opacity-90">
            {isUnlimited
              ? t('unlimited')
              : t('remainingEntries', {
                  count: ticket.remaining_entries!,
                })}
          </div>
        </div>
      ) : (
        <div className="text-center text-lg font-medium">
          {t('noTicket')}
        </div>
      )}
    </div>
  );
}