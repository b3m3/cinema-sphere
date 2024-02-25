import { Link, useParams } from 'react-router-dom';
import { memo, useCallback, useMemo } from 'react';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight  } from "react-icons/md";

import style from './MediaSwitcher.module.scss';

const movieArr = ['popular', 'now_playing', 'upcoming', 'top_rated'];
const tvArr = ['top_rated', 'popular', 'airing_today', 'on_the_air'];

const MediaSwitcher = memo(() => {
  const {filter} = useParams();
  const category = useCategoryFromLocation();

  const currentCategory = useMemo(() => {
    switch (category) {
      case 'tv':
        return tvArr;
      case 'movie':
        return movieArr;
      default:
        break;
    }
  }, [category]);

  const getTitleFromPathname = useCallback((str) => {
    return `/${category}/${str}/1`;
  }, [category])

  const updateLocationPathname = useCallback((str) => {
    return str[0].toUpperCase() + str.slice(1).split('_').join(' ')
  }, [])

  const isActive = useMemo(() => {
    return currentCategory?.indexOf(filter)
  }, [currentCategory, filter]);

  return (
    <div className={style.wrapp}>
      <ul className={style.list}>
        {
          currentCategory?.map((el, i) => (
            <li key={el}>
              <Link 
                className={`${style.button} ${isActive === i ? style.active : null}`} 
                to={getTitleFromPathname(el)}
              >
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
})

export default MediaSwitcher;