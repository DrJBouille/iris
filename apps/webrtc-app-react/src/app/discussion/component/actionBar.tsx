import SquareIconButton from '../../shared/button/squareIconButton';
import { PhoneCall, PhoneOff } from 'lucide-react';
import { DiscutionProps } from '../type/DiscutionProps';

function ActionBar({ user, call, currentCallWidth, hangup }: DiscutionProps) {
  return (
    <div className="w-full flex justify-between">
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
