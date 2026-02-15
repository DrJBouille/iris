import SquareIconButton from '../../shared/button/square-icon-button';
import { PhoneOff } from 'lucide-react';

interface CurrentCallDetailsProps {
  hangup: () => void;
}

function CurrentCallDetails({ hangup }: CurrentCallDetailsProps) {
  return (
    <div className="w-full rounded-lg flex justify-end border p-4">
      <SquareIconButton icon={PhoneOff} onClick={hangup}/>
    </div>
  );
}

export default CurrentCallDetails;
