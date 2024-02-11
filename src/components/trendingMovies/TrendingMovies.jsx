import { Link } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import PosterImage from '../posterImage/PosterImage';
import { IMAGE_URL } from '../../constants/api';
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";
import { fetchTrendingMovies } from '../../store/slices/fetchDataSlice';

import style from './trending-movies.module.scss';
import Loading from '../loading/Loading';

const TrendingMovies = () => {
  const [currentSlide, setCurrentSlie] = useState(16);

  const {homeMovies} = useSelector(state => state.homeMovies);
  const {lang} = useSelector(state => state.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrendingMovies({lang}))
  }, [dispatch, lang]);

  const id = useCallback((slide) => homeMovies?.res?.results[slide]?.id, [homeMovies])
  const srcBackgroundImg = useCallback((slide) => homeMovies?.res?.results[slide]?.backdrop_path, [homeMovies])
  const srcPosterImg = useCallback((slide) => homeMovies?.res?.results[slide]?.poster_path, [homeMovies])
  const title = useCallback((slide) => homeMovies?.res?.results[slide]?.title, [homeMovies])
  const realese = useCallback((slide) => homeMovies?.res?.results[slide]?.release_date, [homeMovies])
  const overview = useCallback((slide) => homeMovies?.res?.results[slide]?.overview, [homeMovies])

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

      {homeMovies.res?.loading && <Loading size={10} />}

      { 
        Boolean(homeMovies.res?.results.length) &&
          <>
            <div className={style.card}>
              <div className={style.card_image}>
                <img src={`${IMAGE_URL}w1280${srcBackgroundImg(currentSlide)}`} alt=" " />
              </div>

              <div className={style.card_poster}>
                <PosterImage id={id(currentSlide)} poster_path={srcPosterImg(currentSlide)} category={'movie'} link />
              </div>

              <h2 className={style.card_title}>
                <Link to={`/movie/${id(currentSlide)}`}>{title(currentSlide)}</Link>
                <span>{moment(realese(currentSlide)).format('DD MMMM, YYYY')}</span>
              </h2>

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
                    <p className={style.list_title}>{title(item)}</p>
                    <span className={style.list_overview}>{overview(item)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>    
      }
    </div>
  );
}

export default TrendingMovies;