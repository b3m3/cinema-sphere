import { BsBookmarkStarFill } from "react-icons/bs";
import style from './add-to-watchlist.module.scss';

const AddToWatchlist = ({id, orange, bookmark}) => {
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
          : bookmark ? {background: 'none'}
          : null
      }
    >
      {
        bookmark
          ? <BsBookmarkStarFill style={{fontSize: '22px', color: 'var(--blue-300)'}} />
          : <>
              {!orange && '+'}

              <span>
                {orange ? '+ Add to Watchlist' : 'Watchlist'}
              </span>
            </>
      }

    </button>
  );
}

export default AddToWatchlist;