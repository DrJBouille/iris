import SquareIconButton from '../../shared/button/squareIconButton';
import { Phone, PhoneOff } from 'lucide-react';

interface IncomingCallProps {
  pickup: (receiver: string) => Promise<void>
  hangup: () => void
  caller: string
}

function IncomingCall({ pickup, hangup, caller }: IncomingCallProps) {
  return(
    <div className="w-screen h-screen fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg min-w-[300px]">
        <h2 className="text-lg font-bold">Popup</h2>

        <SquareIconButton icon={Phone} onClick={() => pickup(caller)}/>
        <SquareIconButton icon={PhoneOff} onClick={hangup}/>

        <button onClick={close}>Close</button>
      </div>
    </div>
  );
}

export default IncomingCall;
