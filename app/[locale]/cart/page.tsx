'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  fetchTicketPlans,
  createCheckout,
  TicketPlan,
} from '@/lib/api/ticketPlans';

export default function CartPage() {
  const t = useTranslations('Cart');
  const [plans, setPlans] = useState<TicketPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<number | null>(null);

  useEffect(() => {
    fetchTicketPlans()
      .then(setPlans)
      .finally(() => setLoading(false));
  }, []);

  async function handleBuy(planId: number) {
    setCheckoutLoading(planId);
    const { url } = await createCheckout(planId);
    window.location.assign(url);
  }

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-8">
        {t('loading')}
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {t('title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map(plan => (
          <div
            key={plan.id}
            className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-bold">
                {plan.name}
              </h2>

              <div className="text-3xl font-extrabold mt-4">
                {(plan.price_cents / 100).toFixed(2)} €
              </div>

              <ul className="mt-4 space-y-1 text-sm text-gray-600">
                {plan.max_entries ? (
                  <li>• {t('entries', { count: plan.max_entries })}</li>
                ) : (
                  <li>• {t('unlimited')}</li>
                )}

                {plan.duration_days && (
                  <li>• {t('validDays', { days: plan.duration_days })}</li>
                )}
              </ul>
            </div>

            <button
              onClick={() => handleBuy(plan.id)}
              disabled={checkoutLoading === plan.id}
              className="
                mt-6
                w-full
                py-2
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                transition
                disabled:opacity-50
              "
            >
              {checkoutLoading === plan.id ? '…' : t('buy')}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}