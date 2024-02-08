import { Link, useLocation } from "react-router-dom";
import { FaRegImage } from "react-icons/fa6";

import style from './images-button.module.scss';
import { useMemo } from "react";

const ImagesButton = ({images}) => {
  const { pathname } = useLocation();

  const getResults = () => {
    return images.res?.backdrops ? images.res?.backdrops 
      : images.res?.profiles ? images.res?.profiles 
      : images.res?.posters ? images.res?.posters
      : images.res?.stills ? images.res?.stills
      : null;
  };

  const res = getResults();

  const numberOfImages = useMemo(() => {
    return res && res.length > 0 ? res.length : 0
  }, [res]);

  const path = numberOfImages && numberOfImages > 0 ? `${pathname}/gallery/images` : ''
  const count = numberOfImages && numberOfImages > 1 ? numberOfImages + ' PHOTOS' : numberOfImages + ' PHOTO';

  return (
    <Link className={style.wrapp} to={path} >
      <FaRegImage />
      <span>{ count } </span>
    </Link>
  );
}

export default ImagesButton;