import {useSelector} from "react-redux";
import Language from '../Language/Language';
import WatchListBtn from '../WatchListBtn/WatchListBtn';
import MenuListItems from "./MenuListItems/MenuListItems";
import LogoCS from '../../../components/LogoCS/LogoCS';

import { IoIosCloseCircleOutline } from "react-icons/io";

import style from './Navbar.module.scss';

const Navbar = ({handleCloseNavbar}) => {
  const { menu } = useSelector(state => state.menu);

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