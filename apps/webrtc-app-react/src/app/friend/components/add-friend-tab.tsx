import SimpleInput from '../../shared/form/input/simpleInput';
import { useEffect, useState } from 'react';
import SimpleButton from '../../shared/button/simple-button';
import {
  getReceivedFriendRequests,
  getSendFriendRequests,
  sendFriendRequest,
} from '../services/friends-request-service';
import { FriendRequest } from '../types/FriendRequest';
import FriendRequestList from './friend-request-list';

function AddFriendTab() {
  const [usernameRequest, setUsernameRequest] = useState("");
  const [sentFriendRequest, setSentFriendRequest] = useState<FriendRequest[]>([]);
  const [receiveFriendRequest, setReceiveFriendRequest] = useState<FriendRequest[]>([]);

  useEffect(() => {
    getSendFriendRequests().then(setSentFriendRequest);
    getReceivedFriendRequests().then(setReceiveFriendRequest);
  }, []);

  return(
    <div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-4"><SimpleInput onChange={setUsernameRequest}/></div>
        <SimpleButton text="Send friend request" onClick={() => sendFriendRequest({username: usernameRequest})} center={true}/>
      </div>

      {receiveFriendRequest.length > 0 && <FriendRequestList friendRequests={receiveFriendRequest} title={"Pending friend requests"} isReceived={true}/>}
      {sentFriendRequest.length > 0 && <FriendRequestList friendRequests={sentFriendRequest} title={"Friend requests sent"} isReceived={false}/>}
    </div>
  );
}

export default AddFriendTab;
