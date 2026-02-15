import Line from '../shared/decorator/line';
import SimpleButton from '../shared/button/simple-button';
import { LogOutIcon, Mic } from 'lucide-react';
import { useAuth } from '../authentication/auth-context';
import keycloak from '../authentication/keycloak';

interface SettingsProps {
  close: (value: boolean) => void,
}

function Settings({ close }: SettingsProps) {
  const user = useAuth();
  if (!user) return;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50"
      onClick={() => close(false)}
    >
      <div className="w-2/3 h-4/5 grid grid-cols-5 gap-4 bg-white p-4 rounded-xl" onClick={(e) => e.stopPropagation()}>
        <nav className="h-full border rounded-lg flex flex-col p-2 gap-2">
          <p>{user.username}</p>
          <Line />
          <p>Application settings</p>
          <SimpleButton
            icon={Mic}
            text="Voice"
            onClick={() => console.log('CLICK')}
          />
          <Line />
          <SimpleButton
            icon={LogOutIcon}
            text="Log out"
            onClick={async () => await keycloak.logout()}
          />
        </nav>
        <div className="col-span-4 border rounded-lg"></div>
      </div>
    </div>
  );
}

export default Settings;
