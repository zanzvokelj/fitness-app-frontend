'use client';

import { useEffect, useState, ReactNode } from 'react';
import { fetchAdminStats } from '@/lib/api/admin';
import type { AdminStats } from '@/lib/api/admin';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DashboardView() {
  const [data, setData] = useState<AdminStats | null>(null);

  useEffect(() => {
    fetchAdminStats().then(setData);
  }, []);

  if (!data) {
    return <div className="text-gray-400">Loading dashboard…</div>;
  }

  return (
    <div className="space-y-8">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat title="Users" value={data.kpis.users} />
        <Stat title="Active tickets" value={data.kpis.active_tickets} />
        <Stat title="Bookings" value={data.kpis.bookings} />
        <Stat title="Revenue (€)" value={data.kpis.revenue} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="User registrations">
          <LineChart data={data.users_by_day}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              dataKey="count"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ChartCard>

        <ChartCard title="Revenue">
          <BarChart data={data.revenue_by_day}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#16a34a" />
          </BarChart>
        </ChartCard>

        <ChartCard title="Bookings by weekday">
          <BarChart data={data.bookings_by_weekday}>
            <XAxis
              dataKey="weekday"
              tickFormatter={(v: number) => WEEKDAYS[v]}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#9333ea" />
          </BarChart>
        </ChartCard>

        <ChartCard title="Popular classes">
          <BarChart data={data.popular_classes}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#f97316" />
          </BarChart>
        </ChartCard>
      </div>
    </div>
  );
}

/* =======================
   COMPONENTS
======================= */

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white p-4 rounded shadow h-72">
      <div className="font-semibold mb-2">{title}</div>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}