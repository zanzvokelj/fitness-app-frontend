'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export type ScheduleCalendarProps = {
  selectedDate: Date;
  onSelectDay: (day: Date) => void;
};

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export default function ScheduleCalendar({
  selectedDate,
  onSelectDay,
}: ScheduleCalendarProps) {
  const t = useTranslations('Schedule');

  const startDate = addDays(selectedDate, -3);
  const days = Array.from({ length: 7 }).map((_, i) =>
    addDays(startDate, i),
  );

  return (
    <div className="bg-white rounded-xl shadow mt-6 p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onSelectDay(addDays(selectedDate, -7))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <ChevronLeft />
        </button>

        <h2 className="text-lg font-semibold">
          {selectedDate.toLocaleDateString(undefined, {
            month: 'long',
            year: 'numeric',
          })}
        </h2>

        <button
          onClick={() => onSelectDay(addDays(selectedDate, 7))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <ChevronRight />
        </button>
      </div>

      {/* DAYS */}
      <div className="flex justify-between">
        {days.map(day => {
          const isSelected =
            day.toDateString() === selectedDate.toDateString();

          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelectDay(day)}
              className={`
                w-full mx-1 py-3 rounded-xl text-center transition
                ${
                  isSelected
                    ? 'bg-sky-500 text-white'
                    : 'hover:bg-sky-100'
                }
              `}
            >
              <div className="text-xs opacity-80">
                {t(`days.${day.getDay()}`)}
              </div>
              <div className="text-lg font-semibold">
                {day.getDate()}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-center text-gray-400 text-sm">
        {t('selectDay')}
      </div>
    </div>
  );
}