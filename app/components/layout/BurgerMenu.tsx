'use client';

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { useCenter } from '@/app/providers/CenterProvider';
import { useAuth } from '@/app/hooks/useAuth';
import { useEffect, useState } from 'react';
import { checkIsAdmin } from '@/lib/api/admin';

type BurgerItemProps = {
  icon: string;
  label: string;
  onClick: () => void;
};

function BurgerItem({ icon, label, onClick }: BurgerItemProps) {
  return (
    <div
      onClick={onClick}
      className="
        flex items-center justify-between
        px-4 py-4
        text-gray-500
        hover:bg-gray-100
        cursor-pointer
        transition
        border-t border-[#E7E7E7]
      "
    >
      <div className="flex items-center gap-3">
        <Image src={icon} alt={label} width={22} height={22} />
        <span className="text-lg font-medium">{label}</span>
      </div>

      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );
}

export function BurgerMenu() {
  const t = useTranslations('Common');
  const { isAuthenticated, logout, email } = useAuth();
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const { clearCenter } = useCenter();

  function handleLogout() {
    clearCenter();
    logout();
    router.push(`/${locale}`);
  }

  const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  if (!isAuthenticated) return;

  checkIsAdmin().then(setIsAdmin);
}, [isAuthenticated]);

  return (
    <div className="w-full lg:w-64 bg-white shadow-md">

      {/* 🔵 TOP – avatar + email + login/logout */}
      <div className="bg-blue-500 text-white py-8">
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/images/mainpage/user-avatar-man.png"
            alt="User avatar"
            width={180}
            height={180}
            className="rounded-full"
          />

          {isAuthenticated ? (
            <>
              {/* USER EMAIL */}
              {email && (
                <div className="text-center">
                  <div className="text-lg font-semibold leading-tight">
                    {email}
                  </div>
                </div>
              )}

              {/* LOGOUT */}
              <div
                onClick={handleLogout}
                className="
                  mt-2 flex items-center gap-2
                  cursor-pointer
                  hover:opacity-80
                  transition
                "
              >
                <Image
                  src="/images/icons/circle-arrow-right.svg"
                  alt="Logout"
                  width={24}
                  height={24}
                />
                <span className="text-xl font-semibold">
                  {t('logout')}
                </span>
              </div>
            </>
          ) : (
            <div
              onClick={() => router.push(`/${locale}/login`)}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
            >
              <Image
                src="/images/icons/circle-arrow-right.svg"
                alt="Login"
                width={24}
                height={24}
              />
              <span className="text-xl font-semibold">
                {t('login')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ⚪️ NAVIGATION */}
      <div className="border-t border-[#E7E7E7]">

        {/* Domov */}
        <BurgerItem
          icon="/images/icons/house-gray.svg"
          label={t('home')}
          onClick={() =>
            router.push(
              isAuthenticated ? `/${locale}/dashboard` : `/${locale}`
            )
          }
        />

        {/* Only for logged in */}
        {isAuthenticated && (
          <>
            <BurgerItem
              icon="/images/icons/user-pen.svg"
              label={t('profile')}
              onClick={() => router.push(`/${locale}/profile`)}
            />

            <BurgerItem
              icon="/images/icons/shopping-cart.svg"
              label={t('cart')}
              onClick={() => router.push(`/${locale}/cart`)}
            />

            <BurgerItem
              icon="/images/icons/calendar-1.svg"
              label={t('schedule')}
              onClick={() => router.push(`/${locale}/schedule`)}
            />

            <BurgerItem
              icon="/images/icons/hotel-gray.svg"
              label={t('changeCenter')}
              onClick={() => router.push(`/${locale}/centers`)}
            />

            {isAdmin && (
  <BurgerItem
    icon="/images/icons/settings.svg"
    label={t('admin')}
    onClick={() => router.push(`/${locale}/admin`)}
  />
)}
          </>
        )}
      </div>
    </div>
  );
}