import { useState } from 'react';
import { Link } from 'react-router-dom';

import { IMAGE_URL } from '../../constants/api';
import Mask from './mask.webp'

import style from './poster-image.module.scss';

const PosterImage = ({id, poster_path, title, link, media_type, category}) => {
  const [load, setLoad] = useState(true);

  return (
    <Link 
      className={`${style.poster} ${link ? style.link : ''}`} 
      to={link ? `/${media_type ? media_type : category}/${id}` : ""}
    >
      { load && <span/> }

      <img 
        src={poster_path ? `${IMAGE_URL}w500/${poster_path}` : Mask} 
        alt={title}
        onLoad={() => setLoad(false)}
      />
    </Link>
  );
}

export default PosterImage;