import SquareIconButton from '../../shared/button/square-icon-button';
import { PhoneCall, PhoneOff } from 'lucide-react';
import { User } from '../../authentication/type/User';

export interface ActionBarProps {
  user: User;
  call: (receiver: string) => Promise<void>
  currentCallWidth: string | null
  hangup: () => void
}

function ActionBar({ user, call, currentCallWidth, hangup }: ActionBarProps) {
  return (
    <div className="w-full flex justify-between p-2 border rounded-lg">
      <div>
        <p>{user.username}</p>
      </div>
      <div>
        {currentCallWidth && currentCallWidth == user.username ?
          <SquareIconButton icon={PhoneOff} onClick={() => hangup()}/>:
          <SquareIconButton icon={PhoneCall} onClick={() => call(user.username)} />

        }
      </div>
    </div>
  );
}

export default ActionBar;
