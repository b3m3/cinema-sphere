import { Link } from "react-router-dom";

import { BsBookmarkStarFill } from "react-icons/bs";

import style from './watch-list-btn.module.scss';

const WatchListBtn = () => {
  return (
    <Link className={style.wrapp} to="/watch_list">
      <span>WatchList</span>
      <BsBookmarkStarFill />
    </Link>
  );
}

export default WatchListBtn;