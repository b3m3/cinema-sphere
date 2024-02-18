import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import PosterImage from '../posterImage/PosterImage';

import style from './episode-card.module.scss';
import Rating from '../rating/Rating';

const EpisodeCard = ({air_date, name, overview, runtime, season_number, episode_number, still_path, vote_average, vote_count}) => {
  const {id} = useParams();

  const airDate = air_date && moment(air_date).format('MMMM DD, YYYY');
  const titleLink = `/tv/${id}/seasons/${season_number}/episodes/${episode_number}`;
  const title = `S${season_number}.E${episode_number} ${name}`;
  
  return (
    <div className={style.wrapp}>
      <div className={style.image}>
        <PosterImage 
          id={id}
          category={'tv'}
          poster_path={still_path} 
          season={season_number.toString()} 
          episode={episode_number.toString()} 
          link
        />
      </div>
      <div className={style.body}>
        <div className={style.body_top}>
          <h4>
            <Link to={titleLink}>{title}</Link>
          </h4>

          <span>{ airDate }</span>
        </div>

        <div className={style.body_center}>
          {overview && <p>{overview}</p>}
        </div>

        <div className={style.body_bottom}>
          <Rating rating={vote_average} /> {vote_count > 0 && `(${vote_count})`}
        </div>
      </div>
    </div>
  );
}

export default EpisodeCard;