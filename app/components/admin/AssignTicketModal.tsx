'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { TicketPlan, fetchTicketPlans, assignTicket } from '@/lib/api/adminTickets';


type Props = {
  userId: number;
  centerId: number;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AssignTicketModal({
  userId,
  centerId,
  onClose,
  onSuccess,
}: Props) {
  const t = useTranslations('admin.assignTicket');

  const [plans, setPlans] = useState<TicketPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  /* LOAD PLANS */
  useEffect(() => {
    fetchTicketPlans().then(setPlans);
  }, []);

  /* ASSIGN */
  async function handleAssign() {
    if (!selectedPlan || loading) return;

    setLoading(true);
    try {
      await assignTicket({
        user_id: userId,
        center_id: centerId,
        plan_id: selectedPlan,
      });

      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-6">
        {/* TITLE */}
        <h2 className="text-xl font-bold">
          {t('title')}
        </h2>

        {/* SELECT */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('plan')}
          </label>

          <select
            value={selectedPlan ?? ''}
            onChange={(e) =>
              setSelectedPlan(
                e.target.value ? Number(e.target.value) : null
              )
            }
            className="
              w-full rounded-lg border px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          >
            <option value="">
              {t('selectPlan')}
            </option>

            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} – {(p.price_cents / 100).toFixed(2)} €
              </option>
            ))}
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            {t('cancel')}
          </button>

          <button
            onClick={handleAssign}
            disabled={!selectedPlan || loading}
            className={`
              px-4 py-2 rounded-lg text-white
              ${
                !selectedPlan || loading
                  ? 'bg-gray-400'
                  : 'bg-blue-600 hover:bg-blue-700'
              }
            `}
          >
            {loading ? t('assigning') : t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}