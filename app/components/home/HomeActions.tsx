'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import HomeActionCard from './HomeActionCard';

type Action = {
  icon: string;
  label: string;
  onClick: () => void;
};

export default function HomeActions() {
  const t = useTranslations('Main');
  const locale = useLocale();
  const router = useRouter();

  const actions: Action[] = [
    {
      icon: '/images/icons/login.svg',
      label: t('login'),
      onClick: () => router.push(`/${locale}/login`),
    },
    {
      icon: '/images/icons/user-plus.svg',
      label: t('newUser'),
      onClick: () => router.push(`/${locale}/register`),
    },
    {
      icon: '/images/icons/building.svg',
      label: t('selectCenter'),
      onClick: () => router.push(`/${locale}/centers`),
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      
      {/* ALERT */}
      <p
        className="
          mt-10
          max-w-3xl
          text-center
          text-base
          md:text-lg
          lg:text-xl
          mb-10
          text-[#4D4D4D]
        "
      >
        {t('alert')}
      </p>

      {/* ACTIONS – layout OSTANE IDENTIČEN */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-x-8
          gap-y-10
          mb-10
        "
      >
        {/* Left */}
        <div className="md:justify-self-end">
          <HomeActionCard {...actions[0]} />
        </div>

        {/* Right */}
        <div className="md:justify-self-start md:col-start-3">
          <HomeActionCard {...actions[1]} />
        </div>

        {/* Bottom center */}
        <div className="md:col-start-2 md:row-start-2 flex justify-center">
          <HomeActionCard {...actions[2]} />
        </div>
      </div>
    </div>
  );
}