import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useParams } from 'react-router-dom';

import PosterImage from '../posterImage/PosterImage';
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";
import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';

import style from './seasons-switcher.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

const breakpoints = {
  1024: { slidesPerView: 10, slidesPerGroup: 6 },
  768: { slidesPerView: 8, slidesPerGroup: 4 },
  650: { slidesPerView: 6, slidesPerGroup: 2 },
  475: { slidesPerView: 5, slidesPerGroup: 2 },
  375: { slidesPerView: 3, slidesPerGroup: 2 },
  320: { slidesPerView: 2, slidesPerGroup: 1 },
}

const SeasonsSwitcher = ({res, season}) => {
  const {id} = useParams();

  const activeStyle = {background: 'var(--orange-400)', padding: '5px 3.5px 5px 3.5px'};
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
              <div style={+season === +data.season_number ? activeStyle : null}>
                <PosterImage 
                  poster_path={data.poster_path} 
                  id={id} 
                  category={category}
                  season={data.season_number.toString()}
                  link 
                />
              </div>

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