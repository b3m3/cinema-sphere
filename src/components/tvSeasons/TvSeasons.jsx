import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { fetchTvSeasons } from '../../store/slices/fetchDataSlice';

import Title from '../title/Title';
import EpisodeCard from '../episodeCard/EpisodeCard';

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import style from './tv-seasons.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

const TvSeasons = ({id, seasons, lang, category}) => {
  const [seasonNumber, setSeasonNumber] = useState(1);
  const [maxEpisodes, setMaxEpisodes] = useState(false);

  const {res} = useSelector(state => state.tvSeasons.tvSeasons)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTvSeasons({id, season: seasonNumber, lang}));
  }, [dispatch, id, seasonNumber, lang]);

  const episodesLength = maxEpisodes ? res?.episodes?.length : 12;

  return (
    <div className={style.wrapp}>
      <div className={style.top}>
        <Title title={'Seasons'} link />

        <div className={style.seasons_list}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={18}
            >
              {seasons?.map(({id}, i) => (
                <SwiperSlide key={id}>
                  <button 
                    className={seasonNumber === i + 1 ? style.active : null}
                    onClick={() => setSeasonNumber(i + 1)}
                  >
                    {i + 1}
                  </button>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>

      <div className={style.body}>
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