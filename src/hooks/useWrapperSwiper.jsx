import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

import 'swiper/css';
import 'swiper/css/navigation';

export const useWrapperSwiper = (Component) => {
  return (props) => {
    const uniqueIds = new Set();

    const filteredItems = props.res?.results?.filter(item => {
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
          breakpoints={props.breakpoints}
          spaceBetween={10}
          navigation={{
            nextEl: `.${props.nextEl}`,
            prevEl: `.${props.prevEl}`
          }}
          >
          {filteredItems?.map((data) => +props._id !== +data.id && data.poster_path && (
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