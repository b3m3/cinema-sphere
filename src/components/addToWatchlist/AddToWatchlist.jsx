import { BsBookmarkPlusFill, BsFillBookmarkCheckFill  } from "react-icons/bs";

import style from './add-to-watchlist.module.scss';

const AddToWatchlist = ({id, orange, bookmark}) => {
  return (
    <button 
      className={`${style.wrapp} ${bookmark && style.bookmark}`}
      style={
        orange 
          ? {
              background: 'var(--orange-400)', 
              color: 'var(--black)', 
              borderRadius: 'var(--radius-4)'
            } 
          : bookmark ? {background: 'none'}
          : null
      }
    >
      {
        bookmark
          ? <BsBookmarkPlusFill />
          : <>
              {!orange && '+'}

              <span>
                <BsBookmarkPlusFill /> {orange ? 'Add to Watchlist' : 'Watchlist'}
              </span>
            </>
      }

    </button>
  );
}

export default AddToWatchlist;