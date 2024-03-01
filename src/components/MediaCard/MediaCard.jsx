import { useMemo } from 'react';

import PosterImage from '../PosterImage/PosterImage';
import WatchlistButton from '../WatchlistButton/WatchlistButton';
import Rating from '../Rating/Rating';

import style from './MediaCard.module.scss';

const MediaCard = ({id, posterPath, date, title, rating, white, category, mediaType}) => {
  const dateYear = useMemo(() => {
    return date && `(${date.slice(0, 4)})`
  }, [date])

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

      <div className={`${style.body} ${white && style.white}`}>
        <h4 className={style.body__title}>{title}</h4>

        <div className={style.body__text}>
          <Rating rating={rating} />
          <span>{dateYear}</span>
        </div>
      </div>

      <WatchlistButton id={id} bookmark />
    </div>
  );
}

export default MediaCard;

        