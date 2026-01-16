import type { AdminView } from '@/app/[locale]/admin/page';

type Props = {
  active: AdminView;
  onChange: (v: AdminView) => void;
};

export default function AdminSidebar({ active, onChange }: Props) {
  const item = (id: AdminView, label: string) => {
    const isActive = active === id;

    return (
      <button
        key={id}
        onClick={() => onChange(id)}
        className={`
          w-full flex items-center gap-3
          px-4 py-3 rounded-lg text-sm font-medium
          transition-colors
          ${
            isActive
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-700 hover:bg-gray-100'
          }
        `}
      >
        {label}
      </button>
    );
  };

  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 py-6">
      <h1 className="text-xl font-bold mb-8 px-2">
        Admin
      </h1>

      <nav className="flex flex-col gap-2">
        {item('dashboard', 'Dashboard')}
        {item('users', 'Users')}
        {item('tickets', 'Tickets')}
        {item('sessions', 'Sessions')}
        {item('bookings', 'Bookings')}
        {item('centers', 'Centers')}
        {item('classes', 'Classes')}
      </nav>
    </aside>
  );
}