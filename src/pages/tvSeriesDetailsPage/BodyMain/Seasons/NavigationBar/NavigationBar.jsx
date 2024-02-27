import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import {memo} from "react";

import style from './NavigationBar.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

const NavigationBar = memo(({ seasons, seasonNumber, changeSeasonsHandler }) => {
  return (
    <div className={style.wrapp}>
      <Swiper
        modules={[Navigation]}
        slidesPerView={18}
      >
        {seasons?.map(({season_number, id}) => (
          <SwiperSlide key={id}>
            <button
              className={seasonNumber === season_number ? style.active : null}
              onClick={() => changeSeasonsHandler(season_number)}
            >
              {season_number === 0 ? 'Sp.' : season_number}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default NavigationBar;