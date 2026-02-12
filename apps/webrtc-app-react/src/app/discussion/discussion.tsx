import SimpleInput from '../shared/form/input/simpleInput';
import { useState } from 'react';
import SquareIconButton from '../shared/button/square-icon-button';
import { SendHorizontal } from 'lucide-react';
import { useAuth } from '../authentication/auth-context';


function Discussion() {
  const [messages, setMessages] = useState<string[]>([]);
  const [writtingMessage, setWrittingMessage] = useState<string>("");

  const user = useAuth();
  if (!user) return;

  const addMessage = () => {
    setMessages([...messages, writtingMessage]);
    setWrittingMessage("");
  }

  return (
    <div className="w-full h-full border rounded-lg lg p-4 grid grid-rows-[1fr_auto] gap-2">
      <div className="overflow-y-auto"></div>
      <div className="flex gap-2">
        <SimpleInput placeholder={"Send a message to " + user.username} onChange={setWrittingMessage}/>
        <SquareIconButton icon={SendHorizontal} onClick={() => addMessage}/>
      </div>
    </div>
  );
}

export default Discussion;
