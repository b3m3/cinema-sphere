import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useCallback, useMemo} from 'react';

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

  const memoizedUser = useMemo(() => user, [user]);
  const memoizedMenu = useMemo(() => menu, [menu]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuth());
  }, [dispatch]);

  const handleOpenNavbar = useCallback(() => {
    return dispatch(isOpenMenu());
  }, [dispatch]);

  const handleCloseNavbar = useCallback(() => {
    return dispatch(isCloseMenu());
  }, [dispatch]);

  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.wrapp}>
          <LogoCS />
          <SearchBar />
          <div className={style.hide}>
            <WatchListBtn isAuth={user.isAuth} handleCloseNavbar={handleCloseNavbar} />
          </div>
          {
            user.isAuth 
              ? <User data={memoizedUser.data} dispatch={dispatch} />
              : <SingInBtn /> 
          }
          <div className={style.hide}>
            <Language />
          </div>
          <MenuBtn handleOpenNavbar={handleOpenNavbar} />
          <Navbar handleCloseNavbar={handleCloseNavbar} menu={memoizedMenu} />
        </div>
      </div>
    </header>
  );
}

export default Header;