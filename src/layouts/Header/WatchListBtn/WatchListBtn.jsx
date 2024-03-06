import { Link } from "react-router-dom";
import {memo} from "react";

import { BsBookmarkStarFill } from "react-icons/bs";

import style from './WatchListBtn.module.scss';

const WatchListBtn = memo(({isAuth, handleCloseNavbar}) => {
  return (
    <Link 
      to={isAuth ? "/watchlist/movie" : "/login"}
      className={style.wrapp}
      onClick={handleCloseNavbar}
    >
      <span>WatchList</span>
      <BsBookmarkStarFill />
    </Link>
  );
})

export default WatchListBtn;