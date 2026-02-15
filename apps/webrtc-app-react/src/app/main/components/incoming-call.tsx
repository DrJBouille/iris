import SquareIconButton from '../../shared/button/square-icon-button';
import { Phone, PhoneOff } from 'lucide-react';
import TitleText from '../../shared/text/title-text';
import NormalText from '../../shared/text/normal-text';

interface IncomingCallProps {
  pickup: (receiver: string) => Promise<void>
  hangup: () => void
  caller: string
}

function IncomingCall({ pickup, hangup, caller }: IncomingCallProps) {
  return(
    <div className="w-screen h-screen fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="flex flex-col gap-8 items-center bg-white p-4 rounded-lg shadow-lg px-16 py-12">
        <div className="flex flex-col ">
          <TitleText text={caller}/>
          <NormalText text="Incoming call..."/>
        </div>

        <div className="flex gap-8">
          <SquareIconButton icon={Phone} onClick={() => pickup(caller)}/>
          <SquareIconButton icon={PhoneOff} onClick={hangup}/>
        </div>
      </div>
    </div>
  );
}

export default IncomingCall;
