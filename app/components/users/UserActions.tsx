import { useTranslations } from 'next-intl';

type Props = {
  onAssignTicket: () => void;
  onChangeRole: () => void;
  onDeactivate: () => void;
};

export default function UserActions({
  onAssignTicket,
  onChangeRole,
  onDeactivate,
}: Props) {
  const t = useTranslations('admin.userDetail');

  return (
    <div className="flex gap-3">
      <button className="btn-primary" onClick={onAssignTicket}>
        {t('assignTicket')}
      </button>
      <button className="btn-warning" onClick={onChangeRole}>
        {t('changeRole')}
      </button>
      <button className="btn-danger" onClick={onDeactivate}>
        {t('deactivateUser')}
      </button>
    </div>
  );
}