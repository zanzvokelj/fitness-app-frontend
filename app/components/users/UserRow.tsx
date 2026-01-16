
import { useTranslations } from 'next-intl';
import { AdminUser } from '../views/UsersView';

type Props = {
  user: AdminUser;
  active: boolean;
  onClick: () => void;
};

export default function UserRow({ user, active, onClick }: Props) {
  const t = useTranslations('admin.users');

  return (
    <li
      onClick={onClick}
      className={`
        p-3 rounded cursor-pointer transition
        ${active ? 'bg-blue-100' : 'hover:bg-gray-100'}
      `}
    >
      <div className="font-medium">{user.email}</div>
      <div className="text-sm text-gray-500">
        {user.role} ·{' '}
        {user.is_active ? t('active') : t('disabled')}
      </div>
    </li>
  );
}