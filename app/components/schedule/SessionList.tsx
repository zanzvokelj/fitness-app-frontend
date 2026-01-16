'use client';

import { useTranslations } from 'next-intl';
import type { Session } from '@/lib/api/sessions';
import SessionCard from './SessionCard';

type Props = {
  sessions: Session[];
};

export default function SessionList({ sessions }: Props) {
  const t = useTranslations('Schedule');

  if (sessions.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-4">
        {t('noSessions')}
      </p>
    );
  }

  return (
    <div className="space-y-3 mt-4">
      {sessions.map((s) => (
        <SessionCard key={s.id} session={s} />
      ))}
    </div>
  );
}