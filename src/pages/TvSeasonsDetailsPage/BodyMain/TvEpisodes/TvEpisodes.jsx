import EpisodeCard from '../../../../components/EpisodeCard/EpisodeCard';
import Title from '../../../../components/Title/Title';

import style from './TvEpisodes.module.scss';

const TvEpisodes = ({res}) => {
  return (
    <div className={style.wrapp}>
      <Title title={'Episodes'} />

      <ul>
        {res?.map(({id, air_date, overview, name, season_number, episode_number, still_path, vote_average, vote_count}) => (
          <li key={id}>
            <EpisodeCard
              id={id}
              date={air_date}
              overview={overview}
              title={name}
              season={season_number}
              episode={episode_number}
              posterPath={still_path}
              rating={vote_average}
              votes={vote_count}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TvEpisodes;