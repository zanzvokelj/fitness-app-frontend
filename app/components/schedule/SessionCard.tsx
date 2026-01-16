'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Session } from '@/lib/api/sessions';
import type { Booking } from '@/lib/api/bookings';
import { createBooking, cancelBooking } from '@/lib/api/bookings';
import { useCenter } from '@/app/providers/CenterProvider';
import ConfirmModal from '@/app/components/ui/ConfirmModal';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

type Props = {
  session: Session;
  myBooking?: Booking;
  onChange?: () => void;
};

export default function SessionCard({ session, myBooking, onChange }: Props) {
  const t = useTranslations('Schedule');
  const { selectedCenter } = useCenter();
const [noTicketOpen, setNoTicketOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmType, setConfirmType] =
    useState<'reserve' | 'cancel' | null>(null);

  const bookingStatus: 'idle' | 'active' | 'waiting' =
    myBooking?.status ?? 'idle';

  const start = new Date(session.start_time);
  const end = new Date(session.end_time);
const router = useRouter();
const locale = useLocale();
  const now = new Date();
const hasStarted = start <= now;

const CUTOFF_MINUTES = 60;
const cancelCutoff = new Date(start.getTime() - CUTOFF_MINUTES * 60_000);

const cancelLocked = now >= cancelCutoff;

const canReserve = !hasStarted;
const canCancel =
  bookingStatus === 'active' &&
  !hasStarted &&
  !cancelLocked;

async function confirmReserve() {
  try {
    setLoading(true);
    await createBooking(session.id);
    onChange?.();
    setConfirmType(null);
  } catch (err: unknown) {
    if (err instanceof Error) {
      const message = err.message.toLowerCase();

      if (message.includes('no active ticket')) {
        setConfirmType(null);
        setNoTicketOpen(true);
        return;
      }
    }

    alert(t('bookingError'));
  } finally {
    setLoading(false);
  }
}
  async function confirmCancel() {
    if (!myBooking) return;

    try {
      setLoading(true);
      await cancelBooking(myBooking.id);
      onChange?.();
      setConfirmType(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="border-t border-gray-200 p-3 bg-white space-y-2">
        {/* TIME */}
        <div className="text-sm font-semibold">
          {start.toLocaleTimeString('sl-SI', { hour: '2-digit', minute: '2-digit' })}
          {' – '}
          {end.toLocaleTimeString('sl-SI', { hour: '2-digit', minute: '2-digit' })}
        </div>

        {/* CLASS */}
        <div className="font-bold">
          {session.class_type?.name}
        </div>

        {/* CENTER */}
        <div className="text-sm text-gray-500">
          {selectedCenter?.name}
        </div>

        {/* CAPACITY */}
        <div className="text-sm text-gray-500">
          {t('capacity', {
            count: session.booked_count,
            total: session.capacity,
          })}
        </div>

        {/* CTA */}
   <button
  disabled={
    loading ||
    (bookingStatus === 'idle' && !canReserve) ||
    (bookingStatus === 'active' && !canCancel)
  }
  onClick={() =>
    setConfirmType(
      bookingStatus === 'idle' ? 'reserve' : 'cancel'
    )
  }
  className={`
    mt-2 w-full py-2 rounded-md font-semibold transition
    ${
      hasStarted
        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
        : bookingStatus === 'idle'
        ? 'bg-sky-500 text-white hover:bg-sky-600'
        : cancelLocked
        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
        : 'bg-red-500 text-white hover:bg-red-600'
    }
  `}
>
  {hasStarted
    ? t('started')
    : bookingStatus === 'idle'
    ? t('reserve')
    : cancelLocked
    ? t('cancelLocked')
    : t('cancel')}
</button>
      </div>

      <ConfirmModal
  open={noTicketOpen}
  title={t('noTicketTitle')}
  description={t('noTicketDescription')}
  confirmText={t('goToShop')}
  onConfirm={() => {
    setNoTicketOpen(false);
     router.push(`/${locale}/cart`);
  }}
  onClose={() => setNoTicketOpen(false)}
/>

      {/* CONFIRM RESERVE */}
      <ConfirmModal
        open={confirmType === 'reserve'}
        title={t('confirmReserve')}
        description={`${session.class_type?.name} • ${start.toLocaleTimeString()} – ${end.toLocaleTimeString()}`}
        confirmText={t('confirm')}
        onConfirm={confirmReserve}
        onClose={() => setConfirmType(null)}
        loading={loading}
      />

      {/* CONFIRM CANCEL */}
      <ConfirmModal
        open={confirmType === 'cancel'}
        title={t('confirmCancel')}
        description={`${session.class_type?.name} • ${start.toLocaleTimeString()} – ${end.toLocaleTimeString()}`}
        confirmText={t('cancel')}
        onConfirm={confirmCancel}
        onClose={() => setConfirmType(null)}
        loading={loading}
      />
    </>
  );
}