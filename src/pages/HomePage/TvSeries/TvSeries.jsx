import {memo, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';

import { useWrapperSwiper } from "../../../hooks/useWrapperSwiper";
import {fetchTrendingTvSeries} from "../../../store/asyncThunks/fetchTrendingHome";

import Title from "../../../components/title/Title";
import Loading from "../../../components/loading/Loading";
import MediaCard from "../../../components/mediaCard/MediaCard";

import style from './TvSeries.module.scss';

const breakpoints = {
  1024: { slidesPerView: 7, slidesPerGroup: 7 },
  950: { slidesPerView: 6, slidesPerGroup: 6 },
  768: { slidesPerView: 5, slidesPerGroup: 5 },
  650: { slidesPerView: 4, slidesPerGroup: 4 },
  475: { slidesPerView: 3, slidesPerGroup: 3 },
  375: { slidesPerView: 2, slidesPerGroup: 2 },
  320: { slidesPerView: 1, slidesPerGroup: 1 },
}

const TvSeries = memo(() => {
  const { lang } = useSelector(state => state.lang);
  const { res, loading } = useSelector(state => state.trendingHome.tvSeries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrendingTvSeries({lang}))
  }, [dispatch, lang])

  const SwiperWrapperTvSeries = useWrapperSwiper(MediaCard);

  return (
    <div className={style.wrapp}>
      <Title title={'TV Series'} link={'/tv/top_rated/1'}/>

      {loading && <Loading size={7}/>}

      <SwiperWrapperTvSeries
        res={res}
        nextEl={'sbnst'}
        prevEl={'sbpst'}
        breakpoints={breakpoints}
        category={'tv'}
      />
    </div>
  );
});

export default TvSeries;