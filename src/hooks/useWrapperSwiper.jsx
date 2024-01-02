import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

import 'swiper/css';
import 'swiper/css/navigation';

export const useWrapperSwiper = (Component) => {
  return (props) => {
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
          {props.res?.results?.map((data) => +props.slideId !== +data.id && (
            <SwiperSlide key={data.id}>
              <Component {...data} {...props} />
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