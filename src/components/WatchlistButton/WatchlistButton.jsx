import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import axios from "axios";

import Loading from "../Loading/Loading";
import { BASE_URL } from "../../constants/api";

import { BsBookmarkPlusFill, BsFillBookmarkCheckFill } from "react-icons/bs";

import style from './WatchlistButton.module.scss';

const WatchlistButton = memo(({ id, category, button }) => {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data } = useSelector(state => state.auth.user);
  const watchlist = useSelector(state => state.watchlist);

  const handleClick = useCallback(async () => {
    try {
      setLoading(true);

      const token = window.localStorage.getItem('session');
      const { session_id } = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);

      if (session_id) {
        const response = await axios.post(
          `${BASE_URL}account/${data.id}/watchlist?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}`,
          { media_type: category, media_id: id, watchlist: !active }
        );

        if (response?.data?.success) {
          return setActive(c => !c)
        }
      }
    }
    catch (error) {
      console.error('Error for update data:', error);
    }
    finally {
      setLoading(false);
    }
  }, [active, data, category, id]);

  useEffect(() => {
    const getActive = Boolean(
      watchlist[category]?.res?.filter(el => +el.id === +id).length
    );

    return setActive(getActive);
  }, [watchlist, category, id]);

  return (
    <button
      className={`${style.wrapp} ${button ? style.button : ''} ${active ? style.active : ''}`}
      onClick={handleClick}
    >
      <span>
        {
          loading
            ? <Loading size={90} spinner />
            : <>{ active ? <BsFillBookmarkCheckFill/> : <BsBookmarkPlusFill/> }</>
        }

      </span>

      { button && <p>{ active ? 'Watchlist' : 'Add to Watchlist' }</p> }
    </button>
  );
})

export default WatchlistButton;