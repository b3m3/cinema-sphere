import { BsBookmarkStarFill } from "react-icons/bs";

import style from './add-to-watchlist.module.scss';

const AddToWatchlist = ({id, orange}) => {
  return (
    <button 
      className={style.wrapp}
      style={
        orange 
        ? {
            background: 'var(--orange-400)', 
            color: 'var(--black)', 
            borderRadius: 'var(--radius-4)'
          } 
        : null}
    >
      {!orange && <BsBookmarkStarFill />}

      <span>
        {orange ? '+ Add to Watchlist' : 'Watchlist'}
      </span>
    </button>
  );
}

export default AddToWatchlist;