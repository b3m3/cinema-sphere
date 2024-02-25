import { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTrendingMovies } from "../../../store/asyncThunks/fetchTrendingHome";
import { IoIosArrowForward  } from "react-icons/io";
import Loading from '../../../components/loading/Loading';
import TrendingCard from "./TrendingCard/TrendingCard";
import TrendingList from "./TrendingList/TrendingList";

import style from './TrendingMovies.module.scss';

const TrendingMovies = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { res, loading } = useSelector(state => state.trendingHome.movies);
  const { lang } = useSelector(state => state.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrendingMovies({lang}));
  }, [dispatch, lang]);

  const id = useCallback((slide) => res?.results[slide]?.id, [res])
  const title = useCallback((slide) => res?.results[slide]?.title, [res])
  const overview = useCallback((slide) => res?.results[slide]?.overview, [res])
  const rating = useCallback((slide) => res?.results[slide]?.vote_average, [res])
  const realese = useCallback((slide) => res?.results[slide]?.release_date, [res]);
  const srcBackgroundImg = useCallback((slide) => res?.results[slide]?.backdrop_path, [res]);
  const srcPosterImg = useCallback((slide) => res?.results[slide]?.poster_path, [res]);

  const queueArray = useMemo(() => {
    return [
     {item: currentSlide + 1 < 20 ? currentSlide + 1 : 0},
     {item: currentSlide + 2 < 20 ? currentSlide + 2 : currentSlide === 19 ? 1 : 0},
     {item: currentSlide + 3 < 20 ? currentSlide + 3 : currentSlide + 3 === 20 ? 0 : currentSlide + 3 === 21 ? 1 : 2},
    ]
  }, [currentSlide]);

  return (
    <div className={style.wrapp}>
      { loading && <Loading size={10} /> }

      { 
        Boolean(res?.results.length) &&
          <div className={style.body}>
            <TrendingCard
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              id={id}
              realese={realese}
              title={title}
              srcPosterImg={srcPosterImg}
              srcBackgroundImg={srcBackgroundImg}
            />

            <TrendingList
              queueArray={queueArray}
              id={id}
              title={title}
              overview={overview}
              srcPosterImg={srcPosterImg}
              rating={rating}
            />
          </div>    
      }

      <button className={style.more_movies}>
        <Link to={'/movie/popular/1'}>
          <span>More movies</span> <IoIosArrowForward />
        </Link>
      </button>
    </div>
  );
});

export default TrendingMovies;