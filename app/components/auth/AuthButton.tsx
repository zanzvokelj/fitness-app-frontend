'use client';

type Props = {
  children: string;
  loading?: boolean;
};

export default function AuthButton({ children, loading = false }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="
        w-full
        rounded-xl
        bg-sky-500
        py-2
        text-white
        font-semibold
        hover:bg-sky-600
        disabled:opacity-60
        transition
      "
    >
      {loading ? '...' : children}
    </button>
  );
}