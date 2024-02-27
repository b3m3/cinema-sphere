import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import Title from "../Title/Title";
import Loading from "../Loading/Loading";
import SwiperWrapper from "../SwiperWrapper/SwiperWrapper";
import MediaCard from "../MediaCard/MediaCard";
import {fetchSimilar} from "../../store/asyncThunks/fetchSimilar";
import {SwiperSlide} from "swiper/react";

import style from './Similar.module.scss';

const breakpoints = {
  1024: { slidesPerView: 5, slidesPerGroup: 5 },
  768: { slidesPerView: 6, slidesPerGroup: 6 },
  650: { slidesPerView: 4, slidesPerGroup: 4 },
  475: { slidesPerView: 3, slidesPerGroup: 3 },
  320: { slidesPerView: 2, slidesPerGroup: 2 },
}

const Similar = ({category, id, lang}) => {
  const { res, loading } = useSelector(state => state.similar);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSimilar({category, id, lang}))
  }, [dispatch, category, id, lang]);

  return (
    <div className={style.wrapp}>
      <Title title={'Similar'} />
      { loading && <Loading size={30} black />}

      {
        Boolean(res?.results?.length) &&
          <SwiperWrapper
            btnClass={'similar-arrow-'}
            breakpoints={breakpoints}
          >
            {res?.results?.map(({ id, poster_path, release_date, first_air_date, title, name, vote_average }) => {
              return (
                <SwiperSlide key={id}>
                  <MediaCard
                    id={id}
                    posterPath={poster_path}
                    category={category}
                    date={release_date || first_air_date}
                    title={title || name}
                    rating={vote_average}
                    white
                  />
                </SwiperSlide>
              )
            })}
          </SwiperWrapper>
      }
    </div>
  );
};

export default Similar;