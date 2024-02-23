import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTrending } from "../../store/asyncThunks/fetchTrending";
import { useWrapperSwiper } from '../../hooks/useWrapperSwiper';

import PosterImage from '../posterImage/PosterImage';
import Loading from '../loading/Loading';
import SearchCard from '../searchCard/SearchCard';

import style from './side-trending.module.scss';

const breakpoints = {
  1024: { slidesPerView: 2, slidesPerGroup: 2 },
  768: { slidesPerView: 7, slidesPerGroup: 7 },
  650: { slidesPerView: 5, slidesPerGroup: 5 },
  475: { slidesPerView: 4, slidesPerGroup: 4 },
  320: { slidesPerView: 2, slidesPerGroup: 2 },
}

const SideTrending = ({category, lang, id, list}) => {
  const {loading, res} = useSelector(state => state.trending);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrending({category: `${category ? category : 'all'}`, lang}))
  }, [dispatch, lang, category]);

  const shuffleArray = (array) => {
    const newArray = [...array]; // Создаем копию массива
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Обмен элементов
    }
    return newArray;
  };

  const SwiperWrapper = useWrapperSwiper(PosterImage);

  return (
    <>
      {loading && <Loading size={30} black />}
      {
        res &&        
        <div className={style.wrapp}>
          <h2>Trending</h2>

          {
            list
            ? <ul className={style.list}>
                {Boolean(res?.results) && shuffleArray(res.results)?.slice(0, 10).map(props => (
                  <li key={props.id}>
                    <SearchCard {...props} link />
                  </li>
                ))}
              </ul>
            : <SwiperWrapper
                _id={id}
                res={res} 
                perView={2} 
                nextEl={'sbnt'}
                prevEl={'sbpt'}
                breakpoints={breakpoints}
                link
                category={category}
              />
          }
        </div>
      }
    </>
  );
}

export default SideTrending;