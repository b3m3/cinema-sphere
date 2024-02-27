import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

import 'swiper/css';
import 'swiper/css/navigation';

export const useWrapperSwiper = (Component) => {
  return (props) => {
    const {breakpoints, _id, nextEl, prevEl, res} = props;

    const uniqueIds = new Set();

    const filteredItems = res?.results?.filter(item => {
      if (uniqueIds.has(item.id)) {
        return false;
      }

      uniqueIds.add(item.id);
      return true;
    });

    return (
      <div style={{position: 'relative'}}>
        <Swiper
          modules={[Navigation]}
          breakpoints={breakpoints}
          spaceBetween={10}
          speed={1000}
          navigation={{
            nextEl: `.${nextEl}`,
            prevEl: `.${prevEl}`
          }}
          >

          {filteredItems?.map((data) => +_id !== +data.id && (data.poster_path || data.profile_path) && (
            <SwiperSlide key={data.id}>
              <Component {...data} {...props} media_type={data.media_type} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className={`swiper-button swiper-button-prev ${props.prevEl}`}>
          <IoIosArrowBack />
        </button>
        <button className={`swiper-button swiper-button-next ${props.nextEl}`}>
          <IoIosArrowForward />
        </button>
      </div>
    )
  }
}