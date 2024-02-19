import PosterImage from '../posterImage/PosterImage';
import AddToWatchlist from '../addToWatchlist/AddToWatchlist';
import Rating from '../rating/Rating';

import style from './media-card.module.scss';
import { useMemo } from 'react';

const MediaCard = (params) => {
  const {id, poster_path, release_date, first_air_date, title, name, vote_average, white, category, media_type} = params;

  const releaseDate = useMemo(() => {
    return (release_date || first_air_date) && (release_date || first_air_date).slice(0, 4);
  }, [release_date, first_air_date]);

  const titleName = useMemo(() => {
    return (title || name) && (title || name)
  }, [title, name]);

  const posterProps = useMemo(() => {
    return {poster_path, title, id, category, media_type}
  }, [poster_path, title, id, category, media_type]);

  const date = useMemo(() => {
    return (releaseDate || first_air_date) && `(${releaseDate || first_air_date})`;
  }, [releaseDate, first_air_date])

  return (
    <div className={style.wrapp}>
      <PosterImage {...posterProps} link />

      <div className={`${style.body} ${white && style.white}`}>
        <h4 className={style.body__title}>{titleName}</h4>

        <div className={style.body__text}>
          <Rating rating={vote_average} />

          <span>{date}</span>
        </div>
      </div>

      <AddToWatchlist id={id} bookmark />
    </div>
  );
}

export default MediaCard;

        