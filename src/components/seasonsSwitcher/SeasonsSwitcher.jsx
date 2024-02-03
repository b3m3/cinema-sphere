import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import PosterImage from '../posterImage/PosterImage';

import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

import style from './seasons-switcher.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';

const breakpoints = {
  1024: { slidesPerView: 10, slidesPerGroup: 6 },
  768: { slidesPerView: 8, slidesPerGroup: 4 },
  650: { slidesPerView: 6, slidesPerGroup: 2 },
  475: { slidesPerView: 5, slidesPerGroup: 2 },
  375: { slidesPerView: 3, slidesPerGroup: 2 },
  320: { slidesPerView: 2, slidesPerGroup: 1 },
}

const SeasonsSwitcher = ({res, season}) => {
  const activeStyle = {border: '5px solid var(--orange-400)'};

  const category = useCategoryFromLocation();

  return (
    <div className={style.wrapp}>
      <Swiper
        modules={[Navigation]}
        breakpoints={breakpoints}
        spaceBetween={10}
        speed={1000}
        navigation={{
          nextEl: `.ssns`,
          prevEl: `.ssps`
        }}
      >
        {res?.map((data) => {
          return (
            <SwiperSlide key={data.id}>
              <PosterImage {...data} category={category} link />
              <p className={style.name}>{data.name}</p>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <button className={`swiper-button swiper-button-prev ssps`}>
        <IoIosArrowBack />
      </button>
      <button className={`swiper-button swiper-button-next ssns`}>
        <IoIosArrowForward />
      </button>
    </div>
  )
}

export default SeasonsSwitcher;