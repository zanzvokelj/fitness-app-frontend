'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales } from '@/i18n';

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const currentPath = pathname.replace(/^\/(en|si)/, '');

  return (
    <div className="w-full bg-sky-500 px-4 py-2 flex justify-start gap-3 text-md text-white">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${currentPath}`}
          className="hover:text-emerald-400 transition"
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}