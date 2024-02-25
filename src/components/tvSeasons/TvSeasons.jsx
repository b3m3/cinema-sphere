import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { fetchTvSeasons } from "../../store/asyncThunks/fetchTvSeasons";

import Title from '../title/Title';
import EpisodeCard from '../episodeCard/EpisodeCard';
import Loading from '../Loading/Loading';

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import style from './tv-seasons.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

const TvSeasons = ({id, seasons, lang, category}) => {
  const [seasonNumber, setSeasonNumber] = useState(null);
  const [maxEpisodes, setMaxEpisodes] = useState(false);

  const {loading, res} = useSelector(state => state.tvSeasons)
  const dispatch = useDispatch();
  const {pathname} = useLocation();

  const [curr, setCurr] = useState(null)

  // console.log('seasonNumber', seasonNumber)
  // console.log('seasons', seasons)

  useEffect(() => {
    setCurr(null)
    setCurr(seasons);
  }, [seasons]);

  useEffect(() => {
    const getFirstSeason = curr?.[0]?.season_number;
    setSeasonNumber(getFirstSeason);
  }, [curr]);


  useEffect(() => {
    const season = seasonNumber?.toString();

    if (season) {
      dispatch(fetchTvSeasons({id, season, lang}));
    }
  }, [dispatch, id, seasonNumber, lang]);

  const episodesLength = maxEpisodes ? res?.episodes?.length : 12;
  const link = seasonNumber?.toString() && `${pathname}/seasons/${seasonNumber}`;

  return (
    <div className={style.wrapp}>
      <div className={style.top}>
        <Title title={'Seasons'} link={link} />

        <div className={style.seasons_list}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={18}
            >
              {seasons?.map(({season_number, id}) => (
                <SwiperSlide key={id}>
                  <button 
                    className={seasonNumber === season_number ? style.active : null}
                    onClick={() => setSeasonNumber(season_number)}
                  >
                    {season_number === 0 ? 'Sp.' : season_number}
                  </button>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>

      <div className={style.body}>
        { loading && <Loading size={10} black /> }
        <ul>
          {res?.episodes?.slice(0, episodesLength).map((props) => (
            <li key={props.id}>
              <EpisodeCard {...props} category={category} />
            </li>
          ))}
        </ul>

        {
          res?.episodes?.length > 12 &&
            <button 
              className={style.more} 
              onClick={() => setMaxEpisodes(c => !c)}
            >
              { !maxEpisodes ? <>more <MdKeyboardArrowDown /></> : <>less <MdKeyboardArrowUp /></> }
            </button>
        }
      </div>
    </div>
  );
}

export default TvSeasons;