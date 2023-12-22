import { Link, useParams } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight  } from "react-icons/md";

import style from './media-switcher.module.scss';

const movieArr = ['popular', 'now_playing', 'upcoming', 'top_rated'];

const MediaSwitcher = () => {
  const {filter} = useParams();
  const category = useCategoryFromLocation();

  const getTitleFromPathname = (str) => {
    return `/${category}/${str}/1`;
  }

  const updateLocationPathname = (str) => {
    return str[0].toUpperCase() + str.slice(1).split('_').join(' ')
  }

  const isActive = movieArr.indexOf(filter);

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