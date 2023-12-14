import { BsBookmarkStarFill } from "react-icons/bs";

import style from './add-to-watchlist.module.scss';

const AddToWatchlist = ({id}) => {
  return (
    <button className={style.wrapp}>
      <BsBookmarkStarFill />
      <span>Watchlist</span>
    </button>
  );
}

export default AddToWatchlist;