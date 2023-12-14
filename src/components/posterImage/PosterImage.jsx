import { Link } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { IMAGE_URL } from '../../constants/api';
import Mask from './mask.webp'

import style from './poster-image.module.scss';

const PosterImage = ({id, poster_path, title}) => {
  const category = useCategoryFromLocation();

  return (
    <Link className={style.poster} to={`/${category}/${id}`}>
      <img src={IMAGE_URL ? `${IMAGE_URL}w500/${poster_path}` : Mask} alt={title} />
    </Link>
  );
}

export default PosterImage;