import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import PosterImage from '../posterImage/PosterImage';
import { IMAGE_URL } from '../../constants/api';
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";
import { fetchTrendingMovies } from '../../store/slices/fetchDataSlice';

import style from './trending-movies.module.scss';
import Loading from '../loading/Loading';

const TrendingMovies = () => {
  const [currentSlide, setCurrentSlie] = useState(0);

  const {homeMovies} = useSelector(state => state.homeMovies);
  const {lang} = useSelector(state => state.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrendingMovies({lang}))
  }, [dispatch, lang]);

  const id = homeMovies?.res?.results[currentSlide]?.id;
  const srcBackgroundImg = homeMovies?.res?.results[currentSlide]?.backdrop_path;
  const srcPosterImg = homeMovies?.res?.results[currentSlide]?.poster_path;
  const title = homeMovies?.res?.results[currentSlide]?.title;
  const realese = homeMovies?.res?.results[currentSlide]?.release_date;

  const prevSlide = useCallback(() => {
    return setCurrentSlie(currentSlide > 0 ? currentSlide -1 : 19);
  }, [currentSlide]);

  const newtSlide = useCallback(() => {
    setCurrentSlie(currentSlide < 19 ? currentSlide + 1 : 0);
  }, [currentSlide]);

  return (
    <div className={style.wrapp}>

      {homeMovies.res?.loading && <Loading size={10} />}

      { 
        Boolean(homeMovies.res?.results.length) &&      
          <div className={style.card}>
            <div className={style.card_image}>
              <img src={`${IMAGE_URL}w1280${srcBackgroundImg}`} alt=" " />
            </div>

            <div className={style.card_poster}>
              <PosterImage id={id} poster_path={srcPosterImg} category={'movie'} link />
            </div>

            <h2 className={style.card_title}>
              <Link to={`/movie/${id}`}>{title}</Link>
              <span>{moment(realese).format('DD MMMM, YYYY')}</span>
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
      }
    </div>
  );
}

export default TrendingMovies;