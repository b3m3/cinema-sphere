import {Link, useParams} from 'react-router-dom';
import {memo, useCallback, useMemo} from 'react';

import {useCategoryFromLocation} from "../../hooks/useCategoryFromLocation";
import {BiDotsHorizontalRounded} from "react-icons/bi";

import {convertPathToTitle} from "../../utils/functions";

import style from './MediaSwitcher.module.scss';

const MediaSwitcher = memo(({results}) => {
  const { filter } = useParams();
  const category = useCategoryFromLocation();

  const pathHandler = useCallback((newFilter) => {
    const isWatchlist = category === 'watchlist';

    return`/${category}/${newFilter}${isWatchlist ? '' : '/1'}`;
  }, [category]);

  const isActive = useMemo(() => {
    return results?.indexOf(filter)
  }, [results, filter]);

  return (
    <div className={style.wrapp}>
      <ul className={style.list}>
        {
          results?.map((el, i) => (
            <li key={el}>
              <Link
                className={`${style.button} ${isActive === i ? style.active : null}`}
                to={pathHandler(el)}
              >
                { convertPathToTitle(el) }
              </Link>
            </li>
          ))
        }

        <div className={style.navigate}>
          <BiDotsHorizontalRounded />
        </div>
      </ul>
    </div>
  );
})

export default MediaSwitcher;