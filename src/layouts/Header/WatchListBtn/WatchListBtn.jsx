import { Link } from "react-router-dom";

import { BsBookmarkStarFill } from "react-icons/bs";

import style from './WatchListBtn.module.scss';
import {memo} from "react";

const WatchListBtn = memo(({isAuth, handleCloseNavbar}) => {
  return (
    <Link 
      className={style.wrapp} to={isAuth ? "/watch_list" : "/login"} 
      onClick={handleCloseNavbar}
    >
      <span>WatchList</span>
      <BsBookmarkStarFill />
    </Link>
  );
})

export default WatchListBtn;