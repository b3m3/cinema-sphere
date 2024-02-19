import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';

import { checkAuth } from '../../store/slices/authSlice';
import { isOpenMenu, isCloseMenu } from '../../store/slices/menuSlice';

import Logo from '../logo/Logo';
import SearchBar from '../searchBar/SearchBar';
import Language from '../language/Language';
import WatchListBtn from '../watchListBtn/WatchListBtn';
import SingInBtn from '../singInBtn/SingInBtn';
import User from '../user/User';
import MenuBtn from '../menuBtn/MenuBtn';
import Navbar from '../navbar/Navbar';

import style from './header.module.scss';

const Header = () => {
  const { user } = useSelector(state => state.auth);
  const { menu } = useSelector(state => state.menu);
  const { lang } = useSelector(state => state.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleOpenNavbar = useCallback(() => {
    return dispatch(isOpenMenu());
  }, [dispatch]);

  const handleCloseNavbar = useCallback(() => {
    dispatch(isCloseMenu());
  }, [dispatch]);

  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.wrapp}>
          <Logo menu />
          <SearchBar lang={lang} />
          <div className={style.hide}>
            <WatchListBtn isAuth={user.isAuth} handleCloseNavbar={handleCloseNavbar} />
          </div>
          { 
            user.isAuth 
              ? <User data={user.data} dispatch={dispatch} /> 
              : <SingInBtn /> 
          }
          <div className={style.hide}>
            <Language />
          </div>
          <MenuBtn handleOpenNavbar={handleOpenNavbar} />
          <Navbar handleCloseNavbar={handleCloseNavbar} menu={menu} />
        </div>
      </div>
    </header>
  );
}

export default Header;