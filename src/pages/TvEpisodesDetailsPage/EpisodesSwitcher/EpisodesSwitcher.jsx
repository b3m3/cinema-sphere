import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {memo, useEffect, useMemo} from "react";

import {fetchTvSeasons} from "../../../store/asyncThunks/fetchTvSeasons";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import style from './EpisodesSwitcher.module.scss';

const EpisodesSwitcher = memo(({id, lang, category, season, episode}) => {
  const tvSeasons = useSelector(state => state.tvSeasons);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTvSeasons({lang, season: season.toString(), id}))
  }, [dispatch, category, season, lang, id]);

  const totalEpisodes = useMemo(() => tvSeasons.res?.episodes?.length, [tvSeasons]);

  const prev = useMemo(() => {
    return +episode > 1 ? episode - 1 : episode
  }, [episode]);

  const next = useMemo(() => {
    return +episode < +totalEpisodes ? +episode + 1 : episode;
  }, [episode, totalEpisodes]);

  const banStyle = useMemo(() => {
    return {pointerEvents: 'none', color: 'var(--white-01)'}
  }, []);

  return (
    <>
      {
        totalEpisodes &&
          <div className={style.wrapp}>
          <Link 
            className={style.button}
            style={+episode <= 1 ? banStyle : null}
            to={`/tv/${id}/seasons/${season}/episodes/${prev}`}
          >
            <IoIosArrowDropleft />
          </Link>
            <div className={style.body}>
              <p>{episode}</p>
              <span>/</span>
              <p>{totalEpisodes}</p>
            </div>
          <Link 
            className={style.button}
            style={+episode === +totalEpisodes ? banStyle : null}
            to={`/tv/${id}/seasons/${season}/episodes/${next}`}
          >
            <IoIosArrowDropright />
          </Link>
        </div>
      }
    </>
  );
})

export default EpisodesSwitcher;