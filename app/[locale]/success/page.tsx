'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SuccessPage() {
  const t = useTranslations('Success');
  const locale = useLocale(); 
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get('order_id');

  return (
    <main className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="bg-white rounded-2xl shadow p-8">
        <div className="text-5xl mb-4">✅</div>

        <h1 className="text-2xl font-bold mb-2">
          {t('title')}
        </h1>

        <p className="text-gray-600 mb-6">
          {t('subtitle')}
        </p>

        {orderId && (
          <p className="text-sm text-gray-400 mb-6">
            {t('order')} #{orderId}
          </p>
        )}

        <button
          onClick={() => router.push(`/${locale}/dashboard`)}
          className="
            w-full
            py-3
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            transition
          "
        >
          {t('cta')}
        </button>
      </div>
    </main>
  );
}