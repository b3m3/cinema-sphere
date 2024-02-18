import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchSimilar, fetchCombinedCredits } from '../../store/slices/fetchDataSlice';
import { useWrapperSwiper } from '../../hooks/useWrapperSwiper';

import Title from '../title/Title';
import MediaCard from '../mediaCard/MediaCard';
import Loading from '../loading/Loading';

import style from './media-swiper.module.scss';

const breakpoints = {
  1024: { slidesPerView: 5, slidesPerGroup: 5 },
  768: { slidesPerView: 6, slidesPerGroup: 6 },
  650: { slidesPerView: 4, slidesPerGroup: 4 },
  475: { slidesPerView: 3, slidesPerGroup: 3 },
  320: { slidesPerView: 2, slidesPerGroup: 2 },
}

const MediaSwiper = ({lang, category, id, title}) => {
  const {similar} = useSelector(state => state.similar);
  const {combinedCredits} = useSelector(state => state.combinedCredits);
  const dispatch = useDispatch();

  const isCelebPage = category === 'person';

  useEffect(() => {
    if (isCelebPage) {
      dispatch(fetchCombinedCredits({id, lang}))
    } else {
      dispatch(fetchSimilar({category, id, lang}))
    }
  }, [dispatch, isCelebPage, category, id, lang]);

  const SwiperWrapper = useWrapperSwiper(MediaCard);

  const res = isCelebPage ? combinedCredits.res?.cast : similar.res?.results;
  const loading = isCelebPage ? combinedCredits.loading : similar.loading;

  return (
    <>
      {loading && <Loading size={30} black />}
      {
        res?.length > 0 &&
          <div className={style.wrapp}>
            <Title title={title} />

            <SwiperWrapper
              res={{results: res}}
              white 
              perView={4}
              nextEl={'sbns'}
              prevEl={'sbps'}
              breakpoints={breakpoints}
              category={category}
            />
          </div>
      }
    </>
  );
}

export default MediaSwiper;