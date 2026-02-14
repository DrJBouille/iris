import TitleText from '../../shared/text/title-text';
import Line from '../../shared/decorator/line';
import {
  acceptFriendRequest,
  cancelFriendRequest,
  rejectFriendRequest,
} from '../services/friends-request-service';
import SquareIconButton from '../../shared/button/square-icon-button';
import { Ban, Check, X } from 'lucide-react';
import { FriendRequest } from '../types/FriendRequest';

interface FriendRequestListProps {
  friendRequests: FriendRequest[];
  title: string;
  isReceived: boolean
}

function FriendRequestList({ friendRequests, title, isReceived }: FriendRequestListProps) {
  return (
    <div className="w-full flex flex-col gap-2 p-4">
      <TitleText text={title} />
      <Line />
      {friendRequests.map((friendRequest) => (
        <div className="w-full flex justify-between items-center py-4 px-8 bg-gray-100 rounded-lg">
          {isReceived ? <p>{friendRequest.sender.username}</p> : <p>{friendRequest.receiver.username}</p>}
          {isReceived ?
            <div className="flex gap-4">
              <SquareIconButton icon={Check} onClick={() => acceptFriendRequest(friendRequest.id)} />
              <SquareIconButton icon={X} onClick={() => rejectFriendRequest(friendRequest.id)} />
            </div> :
            <SquareIconButton icon={Ban} onClick={() => cancelFriendRequest(friendRequest.id)} />
          }
        </div>
      ))}
    </div>
  );
}

export default FriendRequestList;
