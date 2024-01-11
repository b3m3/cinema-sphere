import PosterImage from '../posterImage/PosterImage';
import AddToWatchlist from '../addToWatchlist/AddToWatchlist';
import Rating from '../rating/Rating';

import style from './media-card.module.scss';

const MediaCard = (params) => {
  const {id, poster_path, release_date, title, vote_average, white, category} = params;

  const releaseDate = release_date?.slice(0, 4);

  return (
    <div className={style.wrapp}>
      <PosterImage poster_path={poster_path} title={title} id={id} link category={category} />

      <div className={`${style.body} ${white && style.white}`}>
        <Rating rating={vote_average} />
        <h4 className={style.body__title}>
          {title} 
          {release_date && ` (${releaseDate})`}
        </h4>
        <AddToWatchlist id={id} />
      </div>
    </div>
  );
}

export default MediaCard;