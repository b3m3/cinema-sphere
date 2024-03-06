import {Link, useLocation, useParams} from 'react-router-dom';
import {memo, useCallback, useMemo} from 'react';

import { BiDotsHorizontalRounded } from "react-icons/bi";

import { convertPathToTitle } from "../../utils/functions";

import style from './MediaSwitcher.module.scss';

const MediaSwitcher = memo(({results}) => {
  const { filter } = useParams();
  const { pathname } = useLocation();

  const pathHandler = useCallback((newFilter) => {
    let array = pathname.split('/');
    const index = array.indexOf(filter);

    array[index] = newFilter;

    return array.join('/')
  }, [filter, pathname])

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