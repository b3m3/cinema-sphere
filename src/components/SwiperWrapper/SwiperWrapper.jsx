import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";

import MediaCard from "../MediaCard/MediaCard";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

import 'swiper/css';
import 'swiper/css/navigation';

const SwiperWrapper = ({currentId, results, category, btnClass, breakpoints}) => {
  return (
    <div style={{position: 'relative'}}>
      <Swiper
        modules={[Navigation]}
        breakpoints={breakpoints}
        spaceBetween={10}
        speed={800}
        navigation={{
          nextEl: `.${btnClass}n`,
          prevEl: `.${btnClass}p`
        }}
      >
        {results?.map(({id, poster_path}) => {
          return +currentId !== +id && (
            <SwiperSlide key={id}>
              <MediaCard
                id={id}
                posterPath={poster_path}
                category={category}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>

      <button className={`swiper-button swiper-button-prev ${btnClass}p`}>
        <IoIosArrowBack/>
      </button>
      <button className={`swiper-button swiper-button-next ${btnClass}n`}>
        <IoIosArrowForward/>
      </button>
    </div>
  );
};

export default SwiperWrapper;