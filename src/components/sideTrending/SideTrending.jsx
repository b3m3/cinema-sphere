import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTrending } from '../../store/slices/fetchDataSlice';
import { useWrapperSwiper } from '../../hooks/useWrapperSwiper';

import PosterImage from '../posterImage/PosterImage';
import Loading from '../loading/Loading';

import style from './side-trending.module.scss';

const breakpoints = {
  1024: { slidesPerView: 2 },
}

const SideTrending = ({category, lang, id}) => {
  const {loading, res} = useSelector(state => state.trending.trending);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrending({category, lang}))
  }, [dispatch, lang, category]);


  const SwiperWrapper = useWrapperSwiper(PosterImage);

  return (
    <>
      {loading && <Loading size={30} black />}
      {
        res &&        
        <div className={style.wrapp}>
          <h2>Trending</h2>

          <SwiperWrapper
            res={res} 
            perView={2} 
            nextEl={'sbnt'}
            prevEl={'sbpt'}
            breakpoints={breakpoints}
            link 
          />
        </div>
      }
    </>
  );
}

export default SideTrending;