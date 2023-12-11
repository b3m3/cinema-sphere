import { Link } from 'react-router-dom';

import Logo from '../logo/Logo';
import SearchBar from '../searchBar/SearchBar';
import Language from '../language/Language';

import { BsBookmarkStarFill } from "react-icons/bs";

import style from './header.module.scss';

const Header = () => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.wrapp}>
          <Logo />
          <SearchBar />
          <div style={{display:'flex', gap:'1px', alignItems:'center'}}>WatchList <BsBookmarkStarFill style={{fontSize:'16px'}}/></div>
          <Link to='/login'>Sing In</Link>
          <Language />
          <div>Menu</div>
        </div>
      </div>
    </header>
  );
}

export default Header;