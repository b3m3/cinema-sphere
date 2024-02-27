import {Swiper} from "swiper/react";
import {Navigation} from "swiper/modules";

import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

import 'swiper/css';
import 'swiper/css/navigation';
import {memo} from "react";

const SwiperWrapper = memo(({children, btnClass, breakpoints}) => {
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
        {children}
      </Swiper>

      <button className={`swiper-button swiper-button-prev ${btnClass}p`}>
        <IoIosArrowBack/>
      </button>
      <button className={`swiper-button swiper-button-next ${btnClass}n`}>
        <IoIosArrowForward/>
      </button>
    </div>
  );
});

export default SwiperWrapper;