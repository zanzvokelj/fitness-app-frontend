'use client';

import { useTranslations } from 'next-intl';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

export default function RegisterForm() {
  const t = useTranslations('Register');

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      
      {/* Title */}
      <h1 className="text-2xl font-semibold text-center mb-2">
        {t('title')}
      </h1>

      <p className="text-center text-gray-500 mb-6">
        {t('subtitle')}
      </p>

      {/* Form */}
      <form className="space-y-4">
        <AuthInput
          type="email"
          label={t('email')}
          placeholder="email@example.com"
        />

        <AuthInput
          type="password"
          label={t('password')}
          placeholder="••••••••"
        />

        <AuthInput
          type="password"
          label={t('passwordRepeat')}
          placeholder="••••••••"
        />

        <AuthButton>
          {t('submit')}
        </AuthButton>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        {t('haveAccount')}{' '}
        <span className="text-sky-600 cursor-pointer hover:underline">
          {t('login')}
        </span>
      </p>
    </div>
  );
}