import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTrendingMovies, fetchTrendingTvSeries, fetchTrendingCelebs } from '../../store/slices/fetchDataSlice';
import { useWrapperSwiper } from '../../hooks/useWrapperSwiper';

import MediaCard from '../../components/mediaCard/MediaCard';
import Title from '../../components/title/Title';
import CelebCard from '../../components/celebCard/CelebCard';
import Loading from '../../components/loading/Loading';

import style from './home-page.module.scss';

const breakpoints = {
  1024: { slidesPerView: 6, slidesPerGroup: 6 },
  768: { slidesPerView: 5, slidesPerGroup: 5 },
  650: { slidesPerView: 4, slidesPerGroup: 4 },
  475: { slidesPerView: 3, slidesPerGroup: 3 },
  375: { slidesPerView: 2, slidesPerGroup: 2 },
  320: { slidesPerView: 1, slidesPerGroup: 1 },
}

const HomePage = () => {
  const {homeMovies} = useSelector(state => state.homeMovies);
  const {homeTvSeries} = useSelector(state => state.homeTvSeries);
  const {homeCelebs} = useSelector(state => state.homeCelebs);
  const {lang} = useSelector(state => state.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrendingMovies({lang}))
    dispatch(fetchTrendingTvSeries({lang}))
    dispatch(fetchTrendingCelebs({lang}))
  }, [dispatch, lang]);

  const SwiperWrapperCelebs = useWrapperSwiper(CelebCard);
  const SwiperWrapperTvSeries = useWrapperSwiper(MediaCard);

  return (
    <div className="container">
      <section className={style.wrapp}>
        <div className={style.row}>
          <Title title={'Celebs'} />

          <SwiperWrapperCelebs
            res={homeCelebs.res}
            big
            nextEl={'sbnsc'}
            prevEl={'sbpsc'}
            breakpoints={breakpoints}
            category={'person'}
          />
        </div>

        <div className={style.row}>
          <Title title={'TV Series'} />

          { homeTvSeries.loading && <Loading size={7} />}

          <SwiperWrapperTvSeries
            res={homeTvSeries.res}
            nextEl={'sbnst'}
            prevEl={'sbpst'}
            breakpoints={breakpoints}
            category={'tv'}
          />
        </div>
      </section>
    </div>
  );
}

export default HomePage;