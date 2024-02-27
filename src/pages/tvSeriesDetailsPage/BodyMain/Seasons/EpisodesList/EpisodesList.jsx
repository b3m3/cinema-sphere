import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";

import EpisodeCard from "../../../../../components/EpisodeCard/EpisodeCard";
import {fetchTvSeasons} from "../../../../../store/asyncThunks/fetchTvSeasons";
import Loading from "../../../../../components/Loading/Loading";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

import style from './EpisodesList.module.scss';

const EpisodesList = ({id, lang, category, seasonNumber}) => {
  const [maxEpisodes, setMaxEpisodes] = useState(false);

  const {loading, res} = useSelector(state => state.tvSeasons)
  const dispatch = useDispatch();

  useEffect(() => {
    const season = seasonNumber?.toString();

    if (season) {
      dispatch(fetchTvSeasons({id, season, lang}));
    }
  }, [dispatch, id, seasonNumber, lang]);

  const episodesLength = maxEpisodes ? res?.episodes?.length : 12;

  const moreBtnHandler = useCallback(() => {
    return setMaxEpisodes(c => !c)
  }, []);
  
  return (
    <>
      { loading && <Loading size={10} black /> }

      {
        Boolean(res?.episodes.length) &&
          <ul className={style.wrapp}>
            {res?.episodes?.slice(0, episodesLength)
              .map(({id, air_date, overview, still_path, vote_average, vote_count, name, season_number, episode_number}) => {
                return (
                  <li key={id}>
                    <EpisodeCard
                      date={air_date}
                      title={name}
                      overview={overview}
                      season={season_number}
                      episode={episode_number}
                      posterPath={still_path}
                      rating={vote_average}
                      votes={vote_count}
                      category={category}
                    />
                  </li>
              )
            })}
          </ul>
      }

      {
        res?.episodes?.length > 12 &&
          <button className={style.more} onClick={moreBtnHandler}>
            { !maxEpisodes ? <>more <MdKeyboardArrowDown /></> : <>less <MdKeyboardArrowUp /></> }
          </button>
      }
    </>

  );
};

export default EpisodesList;