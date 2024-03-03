import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import {memo} from "react";

import style from './NavigationBar.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperWrapper from "../../../../../components/SwiperWrapper/SwiperWrapper";

const breakpoints = {
  320: { slidesPerView: 'auto', slidesPerGroup: 3 },
}

const NavigationBar = memo(({ seasons, seasonNumber, changeSeasonsHandler }) => {
  return (
    <div className={style.wrapp}>
      <SwiperWrapper
        breakpoints={breakpoints}
        btnClass={'tv-seasons-nav-'}
      >
        {seasons?.map(({season_number, id}) => (
          <SwiperSlide key={id} style={{minWidth: '2.375rem'}}>
            <button
              className={seasonNumber === season_number ? style.active : null}
              onClick={() => changeSeasonsHandler(season_number)}
            >
              {season_number === 0 ? 'Sp.' : season_number}
            </button>
          </SwiperSlide>
        ))}
      </SwiperWrapper>
    </div>
  );
});

export default NavigationBar;