import FriendList from './component/friendList';
import { useState } from 'react';
import { User } from '../authentication/type/User';
import Discussion from '../discussion/discussion';
import { useWebRtc } from '../service/useWebRTC';
import IncomingCall from './component/incomingCall';

function HomePage() {
  const [activeDiscussion, setActiveDiscussion] = useState<User>();

  const {
    call,
    pickup,
    hangup,
    caller,
    currentCallWith,
    incomingCall
  } = useWebRtc();

  return(
    <div className="w-screen h-screen grid grid-cols-6 gap-4 p-4">
      <FriendList goToDiscussion={setActiveDiscussion}/>
      {activeDiscussion && <div className="col-span-5"><Discussion user={activeDiscussion} call={call} currentCallWidth={currentCallWith} hangup={hangup}/></div>}
      {incomingCall && <IncomingCall pickup={pickup} hangup={hangup} caller={caller}/>}
    </div>
  );
}

export default HomePage;
