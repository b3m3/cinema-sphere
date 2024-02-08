import { useMemo } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import style from './episodes-switcher.module.scss';
import { Link, useParams } from "react-router-dom";

const EpisodesSwitcher = ({totalEpisodes}) => {
  const { id, season, episode } = useParams();

  const prev = useMemo(() => {
    return +episode > 1 ? episode - 1 : episode
  }, [episode]);

  const next = useMemo(() => {
    return +episode < +totalEpisodes ? +episode + 1 : episode;
  }, [episode, totalEpisodes]);

  const banStyle = {pointerEvents: 'none', color: 'var(--white-01)'}

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
}

export default EpisodesSwitcher;