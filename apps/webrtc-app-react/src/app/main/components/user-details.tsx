import { useAuth } from '../../authentication/auth-context';
import SquareIconButton from '../../shared/button/square-icon-button';
import { LogOutIcon, SettingsIcon } from 'lucide-react';
import keycloak from '../../authentication/keycloak';
import { useState } from 'react';
import ConfirmationModal from '../../shared/modal/confirmation-modal';

interface UserDetailsProps {
  setOpened: (value: boolean) => void;
}

function UserDetails({ setOpened }: UserDetailsProps) {
  const [openedConfirmLogOut, setOpenedConfirmLogOut] = useState(false);

  const user = useAuth();
  if (!user) return;

  const logOut = async () => {
    setOpenedConfirmLogOut(false);
    await keycloak.logout();
  };

  return (
    <div className="w-full rounded-lg flex justify-between border p-4">
      <p>{user.username}</p>
      <div className="flex gap-2">
        <SquareIconButton
          icon={LogOutIcon}
          onClick={() => setOpenedConfirmLogOut(true)}
        />
        <SquareIconButton icon={SettingsIcon} onClick={() => setOpened(true)}/>
        {openedConfirmLogOut && <ConfirmationModal title="Log out" text="Are you sure you want to log out ?" cancel={() => setOpenedConfirmLogOut(false)} confirm={logOut}/>}
      </div>
    </div>
  );
}

export default UserDetails;
