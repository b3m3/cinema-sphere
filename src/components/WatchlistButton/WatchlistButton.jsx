import { BsBookmarkPlusFill } from "react-icons/bs";
// import { BsFillBookmarkCheckFill } from 'react-icons/bs'

import style from './WatchlistButton.module.scss';
import {memo} from "react";

const WatchlistButton = memo(({id, orange, bookmark}) => {
  return (
    <button 
      className={`${style.wrapp} ${bookmark && style.bookmark}`}
      style={
        orange 
          ? {
              background: 'var(--grey-400)', 
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
                <BsBookmarkPlusFill /> 
                {orange ? 'Add to Watchlist' : 'Watchlist'}
              </span>
            </>
      }

    </button>
  );
})

export default WatchlistButton;