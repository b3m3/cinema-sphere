import PosterImage from '../posterImage/PosterImage';
import AddToWatchlist from '../addToWatchlist/AddToWatchlist';
import Rating from '../rating/Rating';

import style from './media-card.module.scss';

const MediaCard = (params) => {
  const {id, poster_path, release_date, first_air_date, title, name, vote_average, white, category, media_type} = params;

  const releaseDate = release_date ? release_date.slice(0, 4) : first_air_date ? first_air_date.slice(0, 4) : null;

  return (
    <div className={style.wrapp}>
      <PosterImage poster_path={poster_path} title={title} id={id} link category={category} media_type={media_type} />

      <div className={`${style.body} ${white && style.white}`}>
        <h4 className={style.body__title}>
          {title ? title : name ? name : null}
        </h4>

        <div className={style.body__text}>
          <Rating rating={vote_average} />

          <span>
            {(release_date || first_air_date) && `(${releaseDate || first_air_date})`}
          </span>
        </div>
      </div>

      <AddToWatchlist id={id} bookmark />
    </div>
  );
}

export default MediaCard;

        