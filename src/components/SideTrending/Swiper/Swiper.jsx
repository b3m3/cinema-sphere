import SwiperWrapper from "../../SwiperWrapper/SwiperWrapper";
import {SwiperSlide} from "swiper/react";
import MediaCard from "../../MediaCard/MediaCard";

const Swiper = ({results, category, breakpoints}) => {
  return (
    <SwiperWrapper
      btnClass={'trending-arrow-'}
      breakpoints={breakpoints}
    >
      {results?.map(({ id, poster_path }) => {
        return (
          <SwiperSlide key={id}>
            <MediaCard
              id={id}
              posterPath={poster_path}
              category={category}
            />
          </SwiperSlide>
        )
      })}
    </SwiperWrapper>
  );
};

export default Swiper;