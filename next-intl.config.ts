import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './i18n';

import en from '@/messages/en.json';
import si from '@/messages/si.json';

const messagesMap: Record<Locale, Record<string, unknown>> = {
  en,
  si,
};

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale: Locale =
    locales.includes(locale as Locale)
      ? (locale as Locale)
      : defaultLocale;

  return {
    locale: resolvedLocale,
    messages: messagesMap[resolvedLocale],
  };
});