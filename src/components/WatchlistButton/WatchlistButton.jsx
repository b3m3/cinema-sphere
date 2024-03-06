import {useDispatch, useSelector} from "react-redux";
import {memo, useCallback, useEffect, useState} from "react";
import { BsBookmarkPlusFill, BsFillBookmarkCheckFill } from "react-icons/bs";
import { CgSearchLoading } from "react-icons/cg";

import style from './WatchlistButton.module.scss';

const WatchlistButton = memo(({ id, category, button }) => {
  const [watchlistStatus, setWatchlistStatus] = useState(false);

  const toggleResults = useSelector(state => state.watchlist.toggleResults);
  const tvResults = useSelector(state => state.watchlist.tvResults);

  return (
    <button
      className={`${style.wrapp} ${button ? style.button : ''} ${watchlistStatus ? style.active : ''}`}
      onClick={null}
      disabled={toggleResults?.loading}
    >
      <span>
        {
          toggleResults?.loading
            ? <CgSearchLoading />
            : <>{ watchlistStatus ? <BsFillBookmarkCheckFill/> : <BsBookmarkPlusFill/> }</>
        }
      </span>

      { button && <p>{ watchlistStatus ? 'Watchlist' : 'Add to Watchlist' }</p> }
    </button>
  );
})

export default WatchlistButton;

// const auth = useSelector(state => state.auth);
// const dispatch = useDispatch();

// useEffect(() => {
//
// }, [tvResults, id])

// const handleClick = useCallback(() => {
//   setWatchlistStatus(c => !c);
//
//   const doc = {
//     accountId: auth.user.data?.id,
//     media_type: category,
//     media_id: id,
//     watchlist: !watchlistStatus
//   }
//
// }, [id, category, auth, watchlistStatus]);