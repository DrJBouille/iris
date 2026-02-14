import FriendList from './components/friend-list';
import { useEffect, useState } from 'react';
import Discussion from '../discussion/discussion';
import { useWebRtc } from './hooks/useWebRTC';
import IncomingCall from './components/incoming-call';
import UserDetails from './components/user-details';
import ActionBar from './components/action-bar';
import { signalingService } from './services/signaling-service';
import { ActiveTab, ActiveTabValue } from './types/ActiveTab';
import Friend from '../friend/friend';

function HomePage() {
  const [activeTab, setActiveTab] = useState<ActiveTabValue>({
    activeTab: ActiveTab.DISCUSSION,
  });

  const { call, pickup, hangup, caller, currentCallWith, incomingCall } = useWebRtc();

  useEffect(() => {
    signalingService.connect();
  }, []);

  return (
    <div className="w-screen h-screen grid grid-cols-6 gap-4 p-4">
      <div className="flex flex-col h-full gap-4">
        <FriendList setActiveTab={setActiveTab} />
        <UserDetails />
      </div>

      {(activeTab.activeTab == ActiveTab.DISCUSSION && activeTab.user) && (
        <div className="flex flex-col gap-4 col-span-5">
          <ActionBar
            call={call}
            currentCallWidth={currentCallWith}
            hangup={hangup}
          />
          <Discussion />
        </div>
      )}

      {activeTab.activeTab == ActiveTab.FRIEND && <div className="w-full h-full col-span-5"><Friend /></div>}

      {incomingCall && (
        <IncomingCall pickup={pickup} hangup={hangup} caller={caller} />
      )}
    </div>
  );
}

export default HomePage;
