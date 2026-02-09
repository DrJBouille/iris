import { useEffect, useState } from 'react';
import SimpleButton from '../../shared/button/simpleButton';
import { fetchOnlineUsers } from '../../service/UserService';
import { User } from '../../authentication/type/User';

interface FriendListProps {
  goToDiscussion: (user: User) => void
}

function UserList({goToDiscussion}: FriendListProps) {
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    fetchOnlineUsers().then(setFriends);
  }, []);

  return(
    <div className="w-full h-full flex flex-col gap-2 border rounded-lg p-2 overflow-y-scroll">
      {friends.map(user => (
        <SimpleButton text={user.username} onclick={() => goToDiscussion(user)}/>
      ))}
    </div>
  );
}

export default UserList;
