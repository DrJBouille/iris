import SimpleButton from '../../shared/button/simple-button';
import { NavElement } from '../types/NavElement';

interface NavBarProps {
  setNavElement: (navElement: NavElement) => void;
}

function Navbar({ setNavElement }: NavBarProps) {
  return (
    <nav className="w-full">
      <SimpleButton
        text={'ALL'}
        onClick={() => setNavElement(NavElement.ALL)}
        fit={true}
      />
      <SimpleButton
        text={'ADD'}
        onClick={() => setNavElement(NavElement.ADD)}
        fit={true}
      />
    </nav>
  );
}

export default Navbar;
