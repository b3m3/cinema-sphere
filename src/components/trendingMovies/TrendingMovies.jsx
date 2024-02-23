import { Link } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import PosterImage from '../posterImage/PosterImage';
import Rating from '../rating/Rating';
import { IMAGE_URL } from '../../constants/api';
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";
import { fetchTrending } from "../../store/asyncThunks/fetchTrending";


import style from './trending-movies.module.scss';
import Loading from '../loading/Loading';

const TrendingMovies = () => {
  const [currentSlide, setCurrentSlie] = useState(0);

  const {res, status, loading} = useSelector(state => state.trending);
  const {lang} = useSelector(state => state.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrending({category: 'movie', lang}))
  }, [dispatch, lang]);

  const id = useCallback((slide) => res?.results[slide]?.id, [res])
  const srcBackgroundImg = useCallback((slide) => res?.results[slide]?.backdrop_path, [res])
  const srcPosterImg = useCallback((slide) => res?.results[slide]?.poster_path, [res])
  const title = useCallback((slide) => res?.results[slide]?.title, [res])
  const realese = useCallback((slide) => res?.results[slide]?.release_date, [res])
  const overview = useCallback((slide) => res?.results[slide]?.overview, [res])
  const rating = useCallback((slide) => res?.results[slide]?.vote_average, [res])

  const prevSlide = useCallback(() => {
    return setCurrentSlie(currentSlide > 0 ? currentSlide -1 : 19);
  }, [currentSlide]);

  const newtSlide = useCallback(() => {
    setCurrentSlie(currentSlide < 19 ? currentSlide + 1 : 0);
  }, [currentSlide]);
  

  const queueArray = useMemo(() => {
    return [
     {item: currentSlide + 1 < 20 ? currentSlide + 1 : 0},
     {item: currentSlide + 2 < 20 ? currentSlide + 2 : currentSlide === 19 ? 1 : 0},
     {item: currentSlide + 3 < 20 ? currentSlide + 3 : currentSlide + 3 === 20 ? 0 : currentSlide + 3 === 21 ? 1 : 2},
    ]
  }, [currentSlide]);

  return (
    <div className={style.wrapp}>

      {loading && <Loading size={10} />}

      { 
        Boolean(res?.results.length) &&
          <div className={style.body}>
            <div className={style.card}>
              <div className={style.card_image}>
                <img src={`${IMAGE_URL}w1280${srcBackgroundImg(currentSlide)}`} alt=" " />
              </div>

              <div className={style.card_poster}>
                <PosterImage id={id(currentSlide)} poster_path={srcPosterImg(currentSlide)} category={'movie'} link />
              </div>

              <div className={style.card_body}>
                <Link to={`/movie/${id(currentSlide)}`}>{title(currentSlide)}</Link>
                <span>{moment(realese(currentSlide)).format('DD MMMM, YYYY')}</span>
              </div>

              <div className={style.card_counter}>
                <p>{currentSlide + 1}</p>
                <span>/</span>
                <span>20</span>
              </div>

              <button className={`swiper-button swiper-button-prev`} onClick={prevSlide}>
                <IoIosArrowBack  />
              </button>
              <button className={`swiper-button swiper-button-next`} onClick={newtSlide}>
                <IoIosArrowForward />
              </button>
            </div>

            <ul className={style.list}>
              {queueArray.map(({item}, i) => (
                <li className={style.list_item} key={i}>
                  <PosterImage poster_path={srcPosterImg(item)} id={id(item)} category={'movie'} link />
                  <Link to={`/movie/${id(item)}`}>
                    <div className={style.list_title}>
                      <p>{title(item)}</p>
                      <Rating rating={rating(item)} /> 
                    </div>
                    <span className={style.list_overview}>{overview(item)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>    
      }

      <button className={style.more_movies}>
        <Link to={'/movie/popular/1'}>
          <span>More movies</span> <IoIosArrowForward />
        </Link>
      </button>
    </div>
  );
}

export default TrendingMovies;