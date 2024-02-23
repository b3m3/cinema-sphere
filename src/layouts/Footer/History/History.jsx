import {useDispatch, useSelector} from "react-redux";

import {clearHistory, getHistory} from "../../../store/slices/historySlice";
import {TfiBrushAlt} from "react-icons/tfi";
import {useWrapperSwiper} from "../../../hooks/useWrapperSwiper";
import PosterImage from "../../../components/posterImage/PosterImage";
import {useEffect} from "react";

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

  const SwiperWrapper = useWrapperSwiper(PosterImage);

  return (
    <div className={style.wrapp}>
      <div className={style.top}>
        <h2>Recently viewed</h2>
        {
          Boolean(history.length) &&
          <button onClick={() => dispatch(clearHistory())}>
            <TfiBrushAlt />
          </button>
        }
      </div>

      <div>
        {
          Boolean(history.length)
            ? <SwiperWrapper
              res={{results: history?.slice(0, 25)}}
              white
              perView={4}
              nextEl={'sbnf'}
              prevEl={'sbpf'}
              breakpoints={breakpoints}
              link
            />
            : <span style={{color: 'var(--grey-400)', fontSize: '.875rem'}}>You have no recently viewed pages</span>
        }
      </div>
    </div>
  )
}

export default History;