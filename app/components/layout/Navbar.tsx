'use client';

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useCenter } from '@/app/providers/CenterProvider';
import { useAuth } from '@/app/hooks/useAuth';
type Props = {
  onMenuToggle: () => void;
  menuOpen: boolean;
};

export default function Navbar({ onMenuToggle, menuOpen }: Props) {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { isAuthenticated } = useAuth();
const { selectedCenter } = useCenter();

  return (
    <header className="w-full bg-sky-500 h-14 px-4 flex items-center justify-between">
  
      {/* Burger */}
      <button
        onClick={onMenuToggle}
        aria-label="Open menu"
        className={`
          p-2 rounded-lg transition-all duration-200
          ${
            menuOpen
              ? 'bg-sky-400 ring-2 ring-white/40'
              : 'hover:bg-sky-400/70'
          }
        `}
      >
        <Image
          src="/images/icons/menu.svg"
          alt="Menu"
          width={32}
          height={32}
        />
      </button>
{/* Center / Brand */}
<div
  suppressHydrationWarning
  className="
    absolute left-1/2 -translate-x-1/2
    text-white font-semibold
    text-lg sm:text-xl md:text-4xl
    truncate max-w-[60%]
    text-center
  "
>
  {selectedCenter ? selectedCenter.name : 'Fitness booking'}
</div>

      {/* Home */}
      <button
        aria-label="Home"
        onClick={() =>  router.push(
      isAuthenticated ? `/${locale}/dashboard` : `/${locale}`
    )}
        className="p-2 rounded-lg hover:bg-sky-400/70 transition"
      >
        <Image
          src="/images/icons/house.svg"
          alt="Home"
          width={32}
          height={32}
        />
      </button>
    </header>
  );
}