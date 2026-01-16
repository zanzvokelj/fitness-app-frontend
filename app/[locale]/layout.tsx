import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import '@/styles/globals.css';

import { locales } from '../../i18n';
import en from '@/messages/en.json';
import si from '@/messages/si.json';

import AppShell from '../components/layout/AppShell';
import { AuthProvider } from '../providers/AuthProvider';
import { CenterProvider } from '@/app/providers/CenterProvider';

type Locale = 'en' | 'si';
type Messages = Record<string, unknown>;

const messagesMap: Record<Locale, Messages> = { en, si };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // ⬅️ TO JE BISTVO

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={messagesMap[locale]}
        >
          <AuthProvider>
            <CenterProvider>
              <AppShell>{children}</AppShell>
            </CenterProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}