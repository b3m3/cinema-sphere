import { Link } from "react-router-dom";

import { BsBookmarkStarFill } from "react-icons/bs";

import style from './watch-list-btn.module.scss';

const WatchListBtn = ({isAuth, handleCloseNavbar}) => {
  return (
    <Link 
      className={style.wrapp} to={isAuth ? "/watch_list" : "/login"} 
      onClick={handleCloseNavbar}
    >
      <span>WatchList</span>
      <BsBookmarkStarFill />
    </Link>
  );
}

export default WatchListBtn;