import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { isCloseMenu } from "../../store/slices/menuSlice";

import { BsBookmarkStarFill } from "react-icons/bs";

import style from './watch-list-btn.module.scss';

const WatchListBtn = () => {
  const dispatch = useDispatch();
  const {isAuth} = useSelector(state => state.auth.user);

  return (
    <Link className={style.wrapp} to={isAuth ? "/watch_list" : "/login"} onClick={() => dispatch(isCloseMenu())}>
      <span>WatchList</span>
      <BsBookmarkStarFill />
    </Link>
  );
}

export default WatchListBtn;