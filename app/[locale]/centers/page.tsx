'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { fetchCenters, type Center } from '@/lib/api/centers';
import { useCenter } from '@/app/providers/CenterProvider';

export default function CentersPage() {
  const t = useTranslations('Centers');
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const { selectCenter } = useCenter();

  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const { isAuthenticated } = useAuth();
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchCenters();
        setCenters(data);
      } catch {
        setError(t('errors.loadFailed'));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [t]);

 function onSelect(center: Center) {
  selectCenter(center);

  if (isAuthenticated) {
    router.push(`/${locale}/dashboard`);
  } else {
    router.push(`/${locale}`);
  }
}

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        {t('loading')}
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-20 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-center mb-8">
        {t('title')}
      </h1>

      <div className="space-y-4">
        {centers.map((center) => (
          <div
            key={center.id}
            className="flex items-center justify-between bg-white rounded-xl shadow px-6 py-4"
          >
            <span className="text-lg font-medium">
              {center.name}
            </span>

            <button
              onClick={() => onSelect(center)}
              className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition"
            >
              {t('select')}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}