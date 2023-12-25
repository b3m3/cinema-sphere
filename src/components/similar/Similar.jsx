import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchSimilar } from '../../store/slices/fetchDataSlice';

import Title from '../title/Title';
import MediaCard from '../mediaCard/MediaCard';

import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

import style from './similar.module.scss';
import 'swiper/css';
import 'swiper/scss/navigation';

const Similar = ({lang, category, id}) => {
  const {loading, status, res} = useSelector(state => state.similar.similar);
  const dispatch = useDispatch();

  const prev = useRef(null);
  const next = useRef(null);

  useEffect(() => {
    dispatch(fetchSimilar({category, id, lang}))
  }, [dispatch, category, id, lang]);

  return (
    <div className={style.wrapp}>
      <Title title={'Similar'} />

      <div style={{position: 'relative'}}>
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          loop={true}
          navigation={{
            nextEl: next && next.current,
            prevEl: prev && prev.current
          }}
          className={style.swiper}
        >
          {res?.results?.map((props) => (
            <SwiperSlide key={props.id} className={style.item}>
              <MediaCard {...props} white />
            </SwiperSlide>
          ))}

        </Swiper>

        <button className={`${style.button} ${style.button_prev}`} ref={prev}>
          <IoIosArrowBack />
        </button>
        <button className={`${style.button} ${style.button_next}`} ref={next}>
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}

export default Similar;