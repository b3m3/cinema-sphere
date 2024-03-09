import { Link } from "react-router-dom";
import { memo } from "react";

import { BsBookmarkStarFill } from "react-icons/bs";

import style from './WatchListBtn.module.scss';

const WatchListBtn = memo(({ handleCloseNavbar, isAuth }) => {
  return (
    <Link
      className={style.wrapp}
      to={isAuth ? "/watchlist/movies" : "/login"}
      onClick={handleCloseNavbar}
    >
      <span>WatchList</span>
      <BsBookmarkStarFill/>
    </Link>
  );
})

export default WatchListBtn;