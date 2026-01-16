'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

type Props = {
  type: 'text' | 'email' | 'password';
  label: string;
  value?: string;                 // ⬅️ optional
  onChange?: (value: string) => void;
  placeholder?: string;           // ⬅️ DODANO
};

export default function AuthInput({
  type,
  label,
  value,
  onChange,
  placeholder,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">
        {label}
      </label>

      <div className="relative">
        <input
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          placeholder={placeholder}     // ⬅️ KLJUČNO
          onChange={(e) => onChange?.(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-2
            focus:outline-none
            focus:ring-2
            focus:ring-sky-400
          "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}