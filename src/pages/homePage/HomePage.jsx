import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTrendingMovies, fetchTrendingTvSeries, fetchTrendingCelebs, fetchDiscover } from '../../store/slices/fetchDataSlice';
import { useWrapperSwiper } from '../../hooks/useWrapperSwiper';
import { IoIosArrowForward } from "react-icons/io";

import MediaCard from '../../components/mediaCard/MediaCard';
import Title from '../../components/title/Title';
import CelebCard from '../../components/celebCard/CelebCard';
import Loading from '../../components/loading/Loading';
import PicksCard from '../../components/picksCard/PicksCard';
import TrendingMovies from '../../components/trendingMovies/TrendingMovies';
import ScheduledCard from '../../components/scheduledCard/ScheduledCard';

import style from './home-page.module.scss';

const breakpoints = {
  1024: { slidesPerView: 7, slidesPerGroup: 7 },
  950: { slidesPerView: 6, slidesPerGroup: 6 },
  768: { slidesPerView: 5, slidesPerGroup: 5 },
  650: { slidesPerView: 4, slidesPerGroup: 4 },
  475: { slidesPerView: 3, slidesPerGroup: 3 },
  375: { slidesPerView: 2, slidesPerGroup: 2 },
  320: { slidesPerView: 1, slidesPerGroup: 1 },
}

const picksLisk = [
  {name: 'Anime', link: '/discover/tv/&include_adult=false&with_keywords=210024&/1'},
  {name: 'Comedy', link: '/discover/movie/&with_genres=35&/1'},
  {name: 'Horror', link: '/discover/movie/&with_genres=27&/1'},
];

const HomePage = () => {
  const {homeMovies} = useSelector(state => state.homeMovies);
  const {homeTvSeries} = useSelector(state => state.homeTvSeries);
  const {homeCelebs} = useSelector(state => state.homeCelebs);
  const {discover} = useSelector(state => state.discover);
  const {lang} = useSelector(state => state.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrendingMovies({lang}))
    dispatch(fetchTrendingTvSeries({lang}))
    dispatch(fetchTrendingCelebs({lang}))
  }, [dispatch, lang]);

  useEffect(() => {
    const doc = {
      category: 'movie', 
      filters: '&vote_count.gte=5&include_adult=false&sort_by=primary_release_date.desc', 
      page: 1, 
      lang
    }
    dispatch(fetchDiscover(doc))
  }, [dispatch, lang]);

  const SwiperWrapperTvSeries = useWrapperSwiper(MediaCard);

  return (
    <div className="container">
      <section className={style.wrapp}>
        <div className={style.row}>
          <TrendingMovies data={homeMovies} />
          <button className={style.more_movies}>
            <Link to={'/movie/popular/1'}>
              <span>More movies</span> <IoIosArrowForward />
            </Link>
          </button>
        </div>

        <div className={style.row}>
          <Title title={'Celebs'} link={'/person/popular/1'} />

          { homeCelebs.loading && <Loading size={7} />}

          <ul className={style.celeb_list}>
            {homeCelebs.res?.results?.slice(0, 14).map(props => (
              <li key={props.id}>
                <CelebCard {...props} big />
              </li>
            ))}
          </ul>
        </div>

        <div className={style.row}>
          <h2 className={style.row_title}>Top picks</h2>

          <ul className={style.picks_list}>
            {picksLisk.map(({name, link}) => (
              <li key={name}>
                <PicksCard name={name} link={link} />
              </li>
            ))}
          </ul>
        </div>

        <div className={style.row}>
          <Title title={'TV Series'} link={'/tv/top_rated/1'} />

          { homeTvSeries.loading && <Loading size={7} />}

          <SwiperWrapperTvSeries
            res={homeTvSeries.res}
            nextEl={'sbnst'}
            prevEl={'sbpst'}
            breakpoints={breakpoints}
            category={'tv'}
          />
        </div>

        <div className={style.row}>
          <h2 className={style.row_title}>Latest movies</h2>

          { discover.loading && <Loading size={7} /> }
          
          <ul className={style.scheduled}>
            {discover?.res?.results?.slice(0, 8).map((props, i) => (
              <li className={style.scheduled_item} key={props.id}>
                <span className={style.scheduled_number}>{i + 1}</span>
                <ScheduledCard category={'movie'} {...props} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default HomePage;