import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {SwiperSlide} from "swiper/react";

import {clearHistory, getHistory} from "../../../store/slices/historySlice";
import {TfiBrushAlt} from "react-icons/tfi";
import SwiperWrapper from "../../../components/SwiperWrapper/SwiperWrapper";
import MediaCard from "../../../components/MediaCard/MediaCard";

import style from './History.module.scss'

const breakpoints = {
  1024: { slidesPerView: 8, slidesPerGroup: 8 },
  950: { slidesPerView: 6, slidesPerGroup: 6 },
  768: { slidesPerView: 5, slidesPerGroup: 5 },
  650: { slidesPerView: 4, slidesPerGroup: 4 },
  425: { slidesPerView: 3, slidesPerGroup: 3 },
  320: { slidesPerView: 2, slidesPerGroup: 2 },
}

const History = () => {
  const { history } = useSelector(state => state.history);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  const clearHandler = useCallback(() => {
    dispatch(clearHistory())
  }, [dispatch]);

  return (
    <div className={style.wrapp}>
      <div className={style.top}>
        <h2>Recently viewed</h2>

        {
          Boolean(history.length) &&
            <button onClick={clearHandler}><TfiBrushAlt /></button>
        }
      </div>

      <div>
        {
          Boolean(history.length)
            ?
              <SwiperWrapper
                btnClass={'footer-arrow-'}
                breakpoints={breakpoints}
              >
                {history?.map(({ id, poster_path, category }) => {
                  return (
                    <SwiperSlide key={id}>
                      <MediaCard
                        id={id}
                        posterPath={poster_path}
                        category={category}
                      />
                    </SwiperSlide>
                  )
                })}
              </SwiperWrapper>
            : <span style={{color: 'var(--grey-400)', fontSize: '.875rem'}}>You have no recently viewed pages</span>
        }
      </div>
    </div>
  )
}

export default History;