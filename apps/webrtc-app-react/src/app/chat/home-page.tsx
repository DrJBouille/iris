import FriendList from './component/friend-list';
import { useState } from 'react';
import { User } from '../authentication/type/User';
import Discussion from '../discussion/discussion';
import { useWebRtc } from '../service/useWebRTC';
import IncomingCall from './component/incoming-call';
import UserDetails from './component/user-details';
import ActionBar from './component/action-bar';

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
      <div className="flex flex-col h-full gap-4">
        <FriendList goToDiscussion={setActiveDiscussion}/>
        <UserDetails/>
      </div>
      {activeDiscussion &&
        <div className="flex flex-col gap-4 col-span-5">
          <ActionBar call={call} currentCallWidth={currentCallWith} hangup={hangup}/>
          <Discussion/>
        </div>
      }
      {incomingCall && <IncomingCall pickup={pickup} hangup={hangup} caller={caller}/>}
    </div>
  );
}

export default HomePage;
