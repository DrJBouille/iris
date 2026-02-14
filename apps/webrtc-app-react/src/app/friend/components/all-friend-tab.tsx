import { useEffect, useState } from 'react';
import { getFriends } from '../services/friendship-service';
import { User } from '../../authentication/type/User';

interface AllFriendsTabProps {
  click: (user: User) => void;
}

function AllFriendsTab({ click }: AllFriendsTabProps) {
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    getFriends().then(setFriends);
  }, []);

  return(
    <div>
      {friends.map(friend => (
        <button
          className="w-full flex justify-between items-center py-4 px-8 bg-gray-100 rounded-lg"
          onClick={() => click(friend)}
        >
          <p>{friend.username}</p>
        </button>
      ))}
    </div>
  );
}

export default AllFriendsTab;
