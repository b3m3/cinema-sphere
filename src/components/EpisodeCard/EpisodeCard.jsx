import Rating from '../Rating/Rating';
import { useMemo } from 'react';
import moment from 'moment';

import { Link, useParams } from 'react-router-dom';
import PosterImage from '../PosterImage/PosterImage';

import style from './EpisodeCard.module.scss';

const EpisodeCard = ({date, title, overview, season, episode, posterPath, rating, votes}) => {
  const {id} = useParams();

  const airDate = useMemo(() => {
    return date && moment(date).format('MMMM DD, YYYY');
  }, [date]);
  
  const titleLink = useMemo(() => {
    return `/tv/${id}/seasons/${season}/episodes/${episode}`;
  }, [id, season, episode]);
  
  const titleName = useMemo(() => {
    return `S${season}.E${episode} ${title}`
  }, [season, episode, title]);
  
  return (
    <div className={style.wrapp}>
      <div className={style.image}>
        <PosterImage
          id={id}
          category={'tv'}
          posterPath={posterPath}
          season={season?.toString()}
          episode={episode?.toString()}
          link 
        />
      </div>
      <div className={style.body}>
        <div className={style.body_top}>
          <h4>
            <Link to={titleLink}>{ titleName }</Link>
          </h4>

          <span>{ airDate }</span>
        </div>

        <div className={style.body_center}>
          {overview && <p>{overview}</p>}
        </div>

        <div className={style.body_bottom}>
          <Rating rating={rating} /> {votes > 0 && `(${votes})`}
        </div>
      </div>
    </div>
  );
}

export default EpisodeCard;