import Logo from '../logo/Logo';
import SearchBar from '../searchBar/SearchBar';
import Language from '../language/Language';
import WatchListBtn from '../watchListBtn/WatchListBtn';
import SingInBtn from '../singInBtn/SingInBtn';
import MenuBtn from '../menuBtn/MenuBtn';
import Navbar from '../navbar/Navbar';

import style from './header.module.scss';

const Header = () => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.wrapp}>
          <Logo />
          <SearchBar />
          <WatchListBtn />
          <SingInBtn />
          <Language />
          <MenuBtn />
          <Navbar />
        </div>
      </div>
    </header>
  );
}

export default Header;