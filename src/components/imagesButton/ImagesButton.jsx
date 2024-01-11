import { Link } from "react-router-dom";
import { FaRegImage } from "react-icons/fa6";

import style from './images-button.module.scss';
import { useMemo } from "react";

const ImagesButton = ({images, category, id}) => {
  const numberOfImages = useMemo(() => {
    return images.res?.backdrops.length > 0 ? images.res?.backdrops.length : 0
  }, [images]);

  return (
    <>
      <Link className={style.wrapp} to={numberOfImages > 0 ? `/${category}/${id}/gallery/images` : ''}>
        <FaRegImage />
        <span>
          { numberOfImages > 1 ? numberOfImages + ' PHOTOS' : numberOfImages + ' PHOTO' } 
        </span>
      </Link>
    </>
  );
}

export default ImagesButton;