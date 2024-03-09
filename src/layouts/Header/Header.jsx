import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';

import { fetchAuth } from '../../store/asyncThunks/fetchAuth';

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

  const memoizedUser = useMemo(() => user, [user]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuth());
  }, [dispatch]);

  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.wrapp}>
          <LogoCS />
          <SearchBar />

          <div className={style.hide}>
            <WatchListBtn isAuth={memoizedUser?.isAuth} />
          </div>

          { memoizedUser.isAuth ? <User userData={memoizedUser?.data} /> : <SingInBtn /> }

          <div className={style.hide}>
            <Language />
          </div>

          <MenuBtn />
          <Navbar isAuth={memoizedUser?.isAuth} />
        </div>
      </div>
    </header>
  );
}

export default Header;