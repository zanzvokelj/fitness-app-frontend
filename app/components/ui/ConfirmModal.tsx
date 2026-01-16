'use client';

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmText: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
};

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText,
  onConfirm,
  onClose,
  loading,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-full max-w-sm p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-2">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-gray-600 mb-4">
            {description}
          </p>
        )}

        <button
          disabled={loading}
          onClick={onConfirm}
          className="w-full bg-sky-500 text-white py-2 rounded-md font-semibold hover:bg-sky-600 disabled:opacity-60"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}