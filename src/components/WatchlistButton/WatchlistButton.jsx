import {memo, useState} from "react";
import { BsBookmarkPlusFill, BsFillBookmarkCheckFill } from "react-icons/bs";

import style from './WatchlistButton.module.scss';

const WatchlistButton = memo(({ id, button }) => {
  const [watchlistStatus, setWatchlistStatus] = useState(false);

  return (
    <button className={`${style.wrapp} ${button ? style.button : ''} ${watchlistStatus ? style.active : ''}`}>
      <span>{ watchlistStatus ? <BsFillBookmarkCheckFill/> : <BsBookmarkPlusFill/> }</span>

      {
        button &&
          <p>{ watchlistStatus ? 'Watchlist' : 'Add to Watchlist' }</p>
      }
    </button>
  );
})

export default WatchlistButton;