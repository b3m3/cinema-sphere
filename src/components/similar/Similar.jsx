import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchSimilar } from '../../store/slices/fetchDataSlice';
import { useWrapperSwiper } from '../../hooks/useWrapperSwiper';

import Title from '../title/Title';
import MediaCard from '../mediaCard/MediaCard';
import Loading from '../loading/Loading';

import style from './similar.module.scss';

const breakpoints = {
  1024: { slidesPerView: 4 },
  768: { slidesPerView: 5 },
  650: { slidesPerView: 4 },
  475: { slidesPerView: 3 },
  375: { slidesPerView: 2 },
  320: { slidesPerView: 1 },
}

const Similar = ({lang, category, id}) => {
  const {loading, res} = useSelector(state => state.similar.similar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSimilar({category, id, lang}))
  }, [dispatch, category, id, lang]);


  const SwiperWrapper = useWrapperSwiper(MediaCard);

  return (
    <>
      {loading && <Loading size={30} black />}
      {
        res &&        
        <div className={style.wrapp}>
          <Title title={'Similar'} />

          <SwiperWrapper
            res={res}
            white 
            perView={4}
            nextEl={'sbns'}
            prevEl={'sbps'}
            breakpoints={breakpoints}
          />
        </div>
      }
    </>
  );
}

export default Similar;