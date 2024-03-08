import {useEffect, useMemo} from "react";
import SwiperWrapper from "../SwiperWrapper/SwiperWrapper";
import {SwiperSlide} from "swiper/react";
import {useDispatch, useSelector} from "react-redux";

import Title from "../Title/Title";
import Loading from "../Loading/Loading";
import MediaCard from "../MediaCard/MediaCard";
import {fetchCombinedCredits} from "../../store/asyncThunks/fetchCombinedCredits";

import style from './ActorFilmography.module.scss';

const breakpoints = {
  1024: { slidesPerView: 5, slidesPerGroup: 5 },
  768: { slidesPerView: 6, slidesPerGroup: 6 },
  650: { slidesPerView: 4, slidesPerGroup: 4 },
  475: { slidesPerView: 3, slidesPerGroup: 3 },
  320: { slidesPerView: 2, slidesPerGroup: 2 },
}

const ActorFilmography = ({name, id, lang}) => {
  const { res, loading } = useSelector(state => state.combinedCredits);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCombinedCredits({id, lang}))
  }, [dispatch, id, lang]);

  const title = useMemo(() => {
    return `Works Featuring ${name} ${Boolean(res?.cast?.length ) ? `(${res?.cast?.length})` : ''}`
  }, [res ,name])

  return (
    <div className={style.wrapp}>
      <Title title={title} />
      { loading && <Loading size={30} black/> }

      {
        Boolean(res?.cast?.length) &&
          <SwiperWrapper
            btnClass={'filmography-arrow-'}
            breakpoints={breakpoints}
          >
            {res?.cast?.map(({id, poster_path, release_date, first_air_date, name, title, vote_average, media_type}, i) => {
              return (
                <SwiperSlide key={id + i}>
                  <MediaCard
                    id={id}
                    posterPath={poster_path}
                    mediaType={media_type}
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

export default ActorFilmography;