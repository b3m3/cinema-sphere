import { Link, useParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight  } from "react-icons/md";

import style from './media-switcher.module.scss';

const movieArr = ['popular', 'now_playing', 'upcoming', 'top_rated'];

const MediaSwitcher = () => {
  const {filter} = useParams();
  const category = useCategoryFromLocation();

  const getTitleFromPathname = useCallback((str) => {
    return `/${category}/${str}/1`;
  }, [category])

  const updateLocationPathname = useCallback((str) => {
    return str[0].toUpperCase() + str.slice(1).split('_').join(' ')
  }, [])

  const isActive = useMemo(() => {
    return movieArr.indexOf(filter)
  }, [filter]);

  return (
    <div className={style.wrapp}>
      <ul className={style.list}>
        {
          movieArr.map((el, i) => (
            <li key={el}>
              <Link className={`${style.button} ${isActive === i ? style.active : null}`} to={getTitleFromPathname(el)}>
                {updateLocationPathname(el)}
              </Link>
            </li>
          ))
        }

        <div className={style.navigate}>
          <MdKeyboardArrowLeft />
          <MdKeyboardArrowRight />
        </div>
      </ul>
    </div>
  );
}

export default MediaSwitcher;