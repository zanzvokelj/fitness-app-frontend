'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import AuthInput from '@/app/components/auth/AuthInput';
import AuthButton from '@/app/components/auth/AuthButton';
import { registerUser } from '@/lib/api/auth';
import { ChevronLeft } from 'lucide-react';

export default function RegisterPage() {
  const t = useTranslations('Register');
  const router = useRouter();

const { locale } = useParams<{ locale: string }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== passwordRepeat) {
      setError(t('passwordsDoNotMatch'));
      return;
    }

    try {
      setLoading(true);
      await registerUser({ email, password });

  
      router.push(`/${locale}/login`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
<main className="flex flex-1 items-center justify-center px-4">
  <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

    {/* ⬅️ BACK */}
    <button
      type="button"
      onClick={() => router.push(`/${locale}`)}
      className="absolute left-4 top-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition"
    >
      <ChevronLeft className="h-4 w-4" />
      <span>{t('back')}</span>
    </button>

    <h1 className="text-2xl font-semibold text-center mb-2">
      {t('title')}
    </h1>

        <p className="text-center text-sm text-gray-500 mb-6">
          {t('subtitle')}
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
        <AuthInput
  type="email"
  label={t('email')}
  value={email}
  onChange={setEmail}
/>

<AuthInput
  type="password"
  label={t('password')}
  value={password}
  onChange={setPassword}
/>

<AuthInput
  type="password"
  label={t('passwordRepeat')}
  value={passwordRepeat}
  onChange={setPasswordRepeat}
/>

          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          <AuthButton loading={loading}>
            {t('submit')}
          </AuthButton>
        </form>
      </div>
    </main>
  );
}

