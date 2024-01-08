import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { IMAGE_URL } from '../../constants/api';
import Mask from './mask.webp'

import style from './poster-image.module.scss';

const PosterImage = ({id, poster_path, title, link, celeb}) => {
  const [load, setLoad] = useState(true)
  const category = useCategoryFromLocation();

  const doc = {id, poster_path, category: celeb ? 'person' : category};
  
  const setHistory = () => {
    const getLSHistory = localStorage.getItem('history');
    const parse = JSON.parse(getLSHistory);
    
    if (parse && parse.length > 0) {
      const array = parse.reverse().slice(0, 20);
      const res = array.filter(elem => elem.id !== id);

      return localStorage.setItem('history', JSON.stringify([doc, ...res]));
    }

    return localStorage.setItem('history', JSON.stringify([doc]));
  }

  return (
    <Link 
      className={`${style.poster} ${link ? style.link : ''}`} 
      to={link ? `/${celeb ? 'person' : category}/${id}` : ""}
      onClick={setHistory}
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