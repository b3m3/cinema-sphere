import EpisodeCard from '../episodeCard/EpisodeCard';
import Title from '../Title/Title';
import style from './tv-episodes.module.scss';

const TvEpisodes = ({res}) => {
  return (
    <div className={style.wrapp}>
      <Title title={'Episodes'} />

      <ul>
        {res?.map(props => (
          <li key={props.id}>
            <EpisodeCard {...props} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TvEpisodes;