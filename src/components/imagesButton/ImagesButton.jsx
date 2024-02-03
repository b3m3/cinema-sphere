import { Link } from "react-router-dom";
import { FaRegImage } from "react-icons/fa6";

import style from './images-button.module.scss';
import { useMemo } from "react";

const ImagesButton = ({images, category, id}) => {
  const getResults = () => {
    return images.res?.backdrops ? images.res?.backdrops : images.res?.profiles 
      ? images.res?.profiles : images.res?.posters ? images.res?.posters : null;
  };

  const res = getResults();

  const numberOfImages = useMemo(() => {
    return res && res.length > 0 ? res.length : 0
  }, [res]);

  return (
    <Link className={style.wrapp} to={numberOfImages && numberOfImages > 0 ? `/${category}/${id}/gallery/images` : ''}>
      <FaRegImage />
      <span>
        { numberOfImages && numberOfImages > 1 ? numberOfImages + ' PHOTOS' : numberOfImages + ' PHOTO' } 
      </span>
    </Link>
  );
}

export default ImagesButton;