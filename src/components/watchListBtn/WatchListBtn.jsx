import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BsBookmarkStarFill } from "react-icons/bs";

import style from './watch-list-btn.module.scss';

const WatchListBtn = () => {
  const {isAuth} = useSelector(state => state.auth.user);

  return (
    <Link className={style.wrapp} to={isAuth ? "/watch_list" : "/login"}>
      <span>WatchList</span>
      <BsBookmarkStarFill />
    </Link>
  );
}

export default WatchListBtn;