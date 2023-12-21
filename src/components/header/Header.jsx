import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { checkAuth } from '../../store/slices/authSlice';

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
  const { isAuth } = useSelector(state => state.auth.user)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch]);

  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.wrapp}>
          <Logo />
          <SearchBar />
          <div className={style.hide}>
            <WatchListBtn />
          </div>
          { isAuth ? <User /> : <SingInBtn /> }
          <div className={style.hide}>
            <Language />
          </div>
          <MenuBtn />
          <Navbar />
        </div>
      </div>
    </header>
  );
}

export default Header;