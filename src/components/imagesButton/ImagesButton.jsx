import { Link } from "react-router-dom";
import { FaRegImage } from "react-icons/fa6";

import style from './images-button.module.scss';

const ImagesButton = ({images, category, id}) => {
  const numberOfImages = images.res?.backdrops.length > 0 ? images.res?.backdrops.length : 0;

  return (
    <>
      <Link className={style.wrapp} to={`/${category}/${id}/gallery/images`}>
        <FaRegImage />
        <span>
          { numberOfImages > 1 ? numberOfImages + ' PHOTOS' : numberOfImages + ' PHOTO' } 
        </span>
      </Link>
    </>
  );
}

export default ImagesButton;