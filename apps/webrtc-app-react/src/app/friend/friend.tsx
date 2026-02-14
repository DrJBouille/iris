import Navbar from './components/navbar';
import { useState } from 'react';
import { NavElement } from './types/NavElement';
import AddFriendTab from './components/add-friend-tab';
import AllFriendTab from './components/all-friend-tab';
import { User } from '../authentication/type/User';

interface FriendProps {
  click: (user: User) => void;
}

function Friend({ click }: FriendProps) {
  const [navElement, setNavElement] = useState(NavElement.ALL);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Navbar setNavElement={setNavElement} />
      {navElement == NavElement.ADD && <AddFriendTab/>}
      {navElement == NavElement.ALL && <AllFriendTab click={click}/>}
    </div>
  );
}

export default Friend;
