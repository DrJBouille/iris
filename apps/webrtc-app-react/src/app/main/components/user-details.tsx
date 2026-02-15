import { useAuth } from '../../authentication/auth-context';
import SquareIconButton from '../../shared/button/square-icon-button';
import { LogOutIcon, SettingsIcon } from 'lucide-react';
import keycloak from '../../authentication/keycloak';

interface UserDetailsProps {
  setOpened: (value: boolean) => void;
}

function UserDetails({ setOpened }: UserDetailsProps) {
  const user = useAuth();
  if (!user) return;

  return (
    <div className="w-full rounded-lg flex justify-between border p-4">
      <p>{user.username}</p>
      <div className="flex gap-2">
        <SquareIconButton
          icon={LogOutIcon}
          onClick={async () => await keycloak.logout()}
        />
        <SquareIconButton icon={SettingsIcon} onClick={() => setOpened(true)}/>
      </div>
    </div>
  );
}

export default UserDetails;
