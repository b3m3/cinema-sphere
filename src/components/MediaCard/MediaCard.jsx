import { useMemo } from 'react';

import PosterImage from '../PosterImage/PosterImage';
import AddToWatchlist from '../addToWatchlist/AddToWatchlist';
import Rating from '../Rating/Rating';

import style from './MediaCard.module.scss';

const MediaCard = (params) => {
  const {id, posterPath, realese, first_air_date, title, name, rating, white, category, media_type} = params;

  const releaseDate = useMemo(() => {
    return (realese || first_air_date) && (realese || first_air_date).slice(0, 4);
  }, [realese, first_air_date]);

  const titleName = useMemo(() => {
    return (title || name) && (title || name)
  }, [title, name]);

  const posterProps = useMemo(() => {
    return {posterPath, title, id, category, media_type}
  }, [posterPath, title, id, category, media_type]);

  const date = useMemo(() => {
    return (releaseDate || first_air_date) && `(${releaseDate || first_air_date})`;
  }, [releaseDate, first_air_date])

  return (
    <div className={style.wrapp}>
      <PosterImage {...posterProps} link />

      <div className={`${style.body} ${white && style.white}`}>
        <h4 className={style.body__title}>{titleName}</h4>

        <div className={style.body__text}>
          <Rating rating={rating} />

          <span>{date}</span>
        </div>
      </div>

      <AddToWatchlist id={id} bookmark />
    </div>
  );
}

export default MediaCard;

        