import Navbar from './components/navbar';
import { useState } from 'react';
import { NavElement } from './types/NavElement';
import AddFriendTab from './components/add-friend-tab';

function Friend() {
  const [navElement, setNavElement] = useState(NavElement.ALL);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Navbar setNavElement={setNavElement} />
      {navElement == NavElement.ADD && <AddFriendTab/>}
    </div>
  );
}

export default Friend;
