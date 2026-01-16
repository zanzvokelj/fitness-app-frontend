import { AdminUser } from "../views/UsersView";
import UserRow from "./UserRow";


type Props = {
  users: AdminUser[];
  selectedUserId: number | null;
  onSelect: (user: AdminUser) => void;
};

export default function UserTable({
  users,
  selectedUserId,
  onSelect,
}: Props) {
  return (
    <ul className="space-y-2">
      {users.map((u) => (
        <UserRow
          key={u.id}
          user={u}
          active={u.id === selectedUserId}
          onClick={() => onSelect(u)}
        />
      ))}
    </ul>
  );
}