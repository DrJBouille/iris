import { useEffect, useState } from 'react';
import SimpleButton from '../../shared/button/simple-button';
import { getUsers } from '../../service/user-service';
import { User } from '../../authentication/type/User';
import Line from '../../shared/decorator/line';
import { UserIcon } from 'lucide-react';
import { ActiveTab, ActiveTabValue } from '../types/ActiveTab';
import { getFriends } from '../../friend/services/friendship-service';

interface FriendListProps {
  setActiveTab: (value: ActiveTabValue) => void;
}

function UserList({ setActiveTab }: FriendListProps) {
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    getFriends().then(setFriends);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-2 border rounded-lg p-2 overflow-y-scroll">
      <SimpleButton
        text={'Friends'}
        icon={UserIcon}
        onClick={() => setActiveTab( {activeTab: ActiveTab.FRIEND})}
      />
      <Line />
      {friends.map((user) => (
        <SimpleButton
          text={user.username}
          onClick={() => setActiveTab({ activeTab: ActiveTab.DISCUSSION, user })}
        />
      ))}
    </div>
  );
}

export default UserList;
