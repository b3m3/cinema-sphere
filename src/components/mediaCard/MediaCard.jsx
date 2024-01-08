import PosterImage from '../posterImage/PosterImage';
import AddToWatchlist from '../addToWatchlist/AddToWatchlist';
import Rating from '../rating/Rating';

import style from './media-card.module.scss';

const MediaCard = (params) => {
  const {id, poster_path, release_date, title, vote_average, white} = params;

  return (
    <div className={style.wrapp}>
      <PosterImage poster_path={poster_path} title={title} id={id} link/>

      <div className={`${style.body} ${white && style.white}`}>
        <Rating rating={vote_average} />
        <h4 className={style.body__title}>{title} {release_date && (release_date?.slice(0, 4))}</h4>
        <AddToWatchlist id={id} />
      </div>
    </div>
  );
}

export default MediaCard;