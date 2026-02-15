import { useAuth } from '../../authentication/auth-context';
import SquareIconButton from '../../shared/button/square-icon-button';
import { SettingsIcon } from 'lucide-react';
import { useState } from 'react';

function UserDetails() {
  const [openned, setOppened] = useState(false)

  const user = useAuth();
  if (!user) return;

  return (
    <div className="w-full rounded-lg flex justify-between border p-4">
      <p>{user.username}</p>
      <SquareIconButton icon={SettingsIcon} onClick={() => setOppened(true)}/>
    </div>
  );
}

export default UserDetails;
