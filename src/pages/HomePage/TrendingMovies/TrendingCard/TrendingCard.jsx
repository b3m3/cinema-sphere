import {memo, useCallback} from "react";
import {Link} from "react-router-dom";
import moment from "moment/moment";

import {IMAGE_URL} from "../../../../constants/api";
import PosterImage from "../../../../components/posterImage/PosterImage";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

import style from './TrendingCard.module.scss';

const TrendingCard = memo(({id, srcPosterImg, srcBackgroundImg, title, realese, currentSlide, setCurrentSlide}) => {
  const prevSlide = useCallback(() => {
    return setCurrentSlide(currentSlide > 0 ? currentSlide -1 : 19);
  }, [setCurrentSlide, currentSlide]);

  const newtSlide = useCallback(() => {
    setCurrentSlide(currentSlide < 19 ? currentSlide + 1 : 0);
  }, [setCurrentSlide, currentSlide]);
  
  return (
    <div className={style.wrapp}>
      <div className={style.image}>
        <img src={`${IMAGE_URL}w1280${srcBackgroundImg(currentSlide)}`} alt=" "/>
      </div>

      <div className={style.poster}>
        <PosterImage id={id(currentSlide)} poster_path={srcPosterImg(currentSlide)} category={'movie'} link/>
      </div>

      <div className={style.body}>
        <Link to={`/movie/${id(currentSlide)}`}>{title(currentSlide)}</Link>
        <span>{moment(realese(currentSlide)).format('DD MMMM, YYYY')}</span>
      </div>

      <div className={style.counter}>
        <p>{currentSlide + 1}</p>
        <span>/</span>
        <span>20</span>
      </div>

      <button className={`swiper-button swiper-button-prev`} onClick={prevSlide}>
        <IoIosArrowBack/>
      </button>
      <button className={`swiper-button swiper-button-next`} onClick={newtSlide}>
        <IoIosArrowForward/>
      </button>
    </div>
  );
});

export default TrendingCard;