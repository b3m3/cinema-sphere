import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';

import { fetchDetails, fetchVideos } from '../../store/slices/fetchDataSlice';
import { IMAGE_URL } from '../../constants/api';

import Rating from '../../components/rating/Rating';
import VideoTrailer from '../../components/videoTrailer/VideoTrailer';

import style from './movie-details.module.scss';
import Date from '../../components/date/Date';
import Time from '../../components/time/Time';

const MovieDetails = () => {
  const {id} = useParams();
  const {lang} = useSelector(state => state.lang);
  const {details} = useSelector(state => state.details);
  const {videos} = useSelector(state => state.videos);
  const dispatch = useDispatch();

  const category = useCategoryFromLocation();

  useEffect(() =>{
    dispatch(fetchDetails({category, lang, id}))
    dispatch(fetchVideos({category, lang, id}))
  }, [dispatch, category, lang, id]);

  console.log();

  return (
    <div className={style.wrapp}>
      {
        details.res &&
        <>
          <div className={style.top}>
            <div className="container">
              <div className={style.top__wrapp}>
                <img 
                  src={`${IMAGE_URL}/original/${details.res.backdrop_path}`} 
                  alt={details.res.title}
                  className={style.top__backgroung}
                />


                <div className={style.top__head}>
                  <div className={style.top__head_left}>
                    <h1>{details.res.title}</h1>
                    <ul>
                      <li><Date date={details.res.release_date}/></li>
                      <li><Time minutes={details.res.runtime}/></li>
                    </ul>
                  </div>
                  <div className={style.top__head_right}>
                    <Rating rating={details.res.vote_average} vote_count={details.res.vote_count} />
                  </div>
                </div>

                <div className={style.top__center}>
                  <ul>
                    <li>
                      <img src={`${IMAGE_URL}/w500/${details.res.poster_path}`} alt={details.res.title} />
                    </li>
                    <li>
                      {
                        videos.res?.results.length > 0 && <VideoTrailer url={videos.res.results[0].key} />
                      }
                    </li>
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className={style.body}>
            <div className="container">
              <div className={style.body__wrapp}>
                <ul>
                  <li>body</li>
                  <li>body1</li>
                  <li>body1</li>
                  <li>body1</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default MovieDetails;