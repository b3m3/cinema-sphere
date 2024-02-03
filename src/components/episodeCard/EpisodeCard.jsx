import { Link } from 'react-router-dom';
import moment from 'moment';
import PosterImage from '../posterImage/PosterImage';

import style from './episode-card.module.scss';
import Rating from '../rating/Rating';

const EpisodeCard = ({air_date, id, name, category, overview, runtime, season_number, episode_number, still_path, vote_average, vote_count}) => {
  return (
    <div className={style.wrapp}>
      <div className={style.image}>
        <PosterImage poster_path={still_path} />
      </div>
      <div className={style.body}>
        <div className={style.body_top}>
          <h4>
            <Link to={''}>
              S{season_number}.E{episode_number} {name}
            </Link>
          </h4>

          <span>
            { air_date && moment(air_date).format('MMMM DD, YYYY') }
          </span>
        </div>

        <div className={style.body_center}>
          {overview && <p>{overview}</p>}
        </div>

        <div className={style.body_bottom}>
          <Rating rating={vote_average} /> {vote_count > 0 && (vote_count)}
        </div>
      </div>
    </div>
  );
}

export default EpisodeCard;