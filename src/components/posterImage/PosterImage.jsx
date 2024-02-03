import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { IMAGE_URL } from '../../constants/api';
import Mask from './mask.webp'

import style from './poster-image.module.scss';

const PosterImage = ({id, poster_path, title, link, media_type, category, season}) => {
  const [load, setLoad] = useState(true);

  const className = `${style.poster} ${link ? style.link : ''}`;
  const imgSrc = poster_path ? `${IMAGE_URL}w500/${poster_path}` : Mask;
  const path = link ? `/${media_type ? media_type : category}/${id}${season ? `/seasons/${season}` : ''}` : "";

  const onLoad = useCallback(() => {
    return setLoad(false);
  }, []);

  return (
    <Link className={className} to={path}>
      { load && <span/> }
      <img src={imgSrc} alt={title} onLoad={onLoad}/>
    </Link>
  );
}

export default PosterImage;