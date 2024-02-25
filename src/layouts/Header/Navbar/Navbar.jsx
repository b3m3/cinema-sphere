import { IoIosCloseCircleOutline } from "react-icons/io";
import LogoCS from '../../../components/LogoCS/LogoCS';
import Language from '../Language/Language';
import WatchListBtn from '../WatchListBtn/WatchListBtn';

import style from './Navbar.module.scss';
import MenuListItems from "./MenuListItems/MenuListItems";

const Navbar = ({menu, handleCloseNavbar}) => {
  return (
    <div className={`${style.wrapp} ${menu && style.open}`}>
      <div className="container">
        <nav className={style.navbar}>
          <div className={style.top}>
            <LogoCS onClick={handleCloseNavbar} />

            <div className={style.hover}>
              <Language />
              <WatchListBtn/>
            </div>

            <button className={style.close} onClick={handleCloseNavbar} >
              <IoIosCloseCircleOutline />
            </button>
          </div>

          <MenuListItems handleCloseNavbar={handleCloseNavbar} />
        </nav>
      </div>
    </div>
  );
}

export default Navbar;