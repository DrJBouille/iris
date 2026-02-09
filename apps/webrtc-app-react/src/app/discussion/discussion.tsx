import { DiscutionProps } from './type/DiscutionProps';
import ActionBar from './component/actionBar';
import SimpleInput from '../shared/form/input/simpleInput';
import { useState } from 'react';
import SquareIconButton from '../shared/button/squareIconButton';
import { SendHorizontal } from 'lucide-react';

function Discussion({ user, call, currentCallWidth, hangup }: DiscutionProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [writtingMessage, setWrittingMessage] = useState<string>("");

  const addMessage = () => {
    setMessages([...messages, writtingMessage]);
    setWrittingMessage("");
  }

  return (
    <div className="w-full h-full border rounded-lg lg p-4 grid grid-rows-[auto_1fr_auto] gap-2">
      <ActionBar user={user} call={call} currentCallWidth={currentCallWidth} hangup={hangup}/>
      <div className="overflow-y-auto"></div>
      <div className="flex gap-2">
        <SimpleInput placeholder={"Send a message to " + user.username} onChange={setWrittingMessage}/>
        <SquareIconButton icon={SendHorizontal} onClick={() => addMessage}/>
      </div>
    </div>
  );
}

export default Discussion;
