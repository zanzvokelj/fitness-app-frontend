'use client';

import Image from 'next/image';

type Props = {
  icon: string;
  label: string;
  onClick?: () => void;
};

export default function HomeActionCard({ icon, label, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="
        flex flex-col items-center gap-4
        w-40
        p-6
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-xl
        hover:scale-105
        transition
        cursor-pointer
      "
    >
      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
        <Image src={icon} alt={label} width={40} height={40} />
      </div>

      <span className="text-gray-700 font-medium text-center">
        {label}
      </span>
    </div>
  );
}