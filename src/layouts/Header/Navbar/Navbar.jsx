import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Language from '../Language/Language';
import WatchListBtn from '../WatchListBtn/WatchListBtn';
import MenuListItems from "./MenuListItems/MenuListItems";
import LogoCS from '../../../components/LogoCS/LogoCS';
import {isCloseMenu} from "../../../store/slices/menuSlice";

import { IoIosCloseCircleOutline } from "react-icons/io";

import style from './Navbar.module.scss';

const Navbar = ({isAuth}) => {
  const { menu } = useSelector(state => state.menu);

  const dispatch = useDispatch();

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menu]);

  const handleCloseNavbar = useCallback(() => {
    return dispatch(isCloseMenu());
  }, [dispatch]);

  return (
    <div className={`${style.wrapp} ${menu && style.open}`}>
      <div className="container">
        <nav className={style.navbar}>
          <div className={style.top}>
            <LogoCS onClick={handleCloseNavbar} />

            <div className={style.hover}>
              <Language />
              <WatchListBtn handleCloseNavbar={handleCloseNavbar} isAuth={isAuth} />
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