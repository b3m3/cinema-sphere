import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';

import { fetchAuth } from '../../store/asyncThunks/fetchAuth';
import { isOpenMenu, isCloseMenu } from '../../store/slices/menuSlice';

import LogoCS from '../../components/LogoCS/LogoCS';
import Navbar from './Navbar/Navbar';
import SearchBar from './SearchBar/SearchBar';
import Language from './Language/Language';
import WatchListBtn from './WatchListBtn/WatchListBtn';
import User from './User/User';
import MenuBtn from './MenuBtn/MenuBtn';
import SingInBtn from '../../components/SingInBtn/SingInBtn';

import style from './Header.module.scss';

const Header = () => {
  const { user } = useSelector(state => state.auth);
  const { menu } = useSelector(state => state.menu);
  const { lang } = useSelector(state => state.lang);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuth());
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
          <LogoCS menu />
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