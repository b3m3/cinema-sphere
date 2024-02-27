import { useMemo } from 'react';
import PosterImage from '../PosterImage/PosterImage';
import Rating from '../Rating/Rating';

import style from './SearchCard.module.scss';

const SearchCard = (props) => {
  const {id, title, date, mediaType, rating, posterPath, knownFor, category} = props;

  const categoryFullName = useMemo(() => {
    return mediaType === 'tv' ? 'Tv serie' : mediaType === 'movie' ? 'Movie' : category;
  }, [mediaType, category]);

  const dateYear = useMemo(() => date && date.slice(0, 4), [date]);

  return (
    <div className={style.wrapp}>
      <PosterImage
        posterPath={posterPath}
        title={title}
        id={id}
        category={category}
        mediaType={mediaType}
        link
      />
      
      <div className={style.box}>
        <div className={style.box__top}>
          <h4>{title}</h4>
          <Rating rating={rating} /> 
        </div>

        <div className={style.box__row}>
          { categoryFullName && <span>{categoryFullName}</span> }
          { knownFor && <span>{knownFor}</span> }
          { dateYear && <span>{dateYear}</span> }
        </div>
      </div>
    </div>
  );
}

export default SearchCard;