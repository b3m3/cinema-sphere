import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';

import { fetchDetails, fetchVideos, fetchEnglishVideo } from '../../store/slices/fetchDataSlice';

import Rating from '../../components/rating/Rating';
import VideoTrailer from '../../components/videoTrailer/VideoTrailer';
import Date from '../../components/date/Date';
import Time from '../../components/time/Time';
import Details from '../../components/details/Details';
import AddToWatchlist from '../../components/addToWatchlist/AddToWatchlist';

import style from './movie-details.module.scss';
import BackgroundImage from '../../components/backgroundImage/BackgroundImage';
import PosterImage from '../../components/posterImage/PosterImage';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Videos from '../../components/videos/Videos';
import Images from '../../components/images/Images';

const MovieDetails = () => {
  const {id} = useParams();
  const {lang} = useSelector(state => state.lang);
  const {details} = useSelector(state => state.details);
  const {videos} = useSelector(state => state.videos);
  const {englishVideo} = useSelector(state => state.englishVideo);
  const dispatch = useDispatch();

  const category = useCategoryFromLocation();

  useEffect(() =>{
    dispatch(fetchDetails({category, lang, id}))
    dispatch(fetchVideos({category, lang, id}))
    dispatch(fetchEnglishVideo({category, id}))
  }, [dispatch, category, lang, id]);

  const firstTrailer = useMemo(() => {
    return videos.res?.results.length > 0 ? videos.res.results[0].key 
      : englishVideo.res?.results.length > 0 ? englishVideo.res.results[0].key : null;
  }, [videos, englishVideo]);

  return (
    <div className={style.wrapp}>
      { details.loading && <Loading /> }
      { details.status && <Error status={details.status} />}

      {
        details.res &&
        <>
          <div className={style.top}>
            <div className="container">
              <div className={style.top__wrapp}>
                <BackgroundImage backdrop_path={details.res.backdrop_path} />

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
                  <PosterImage title={details.res.title} poster_path={details.res.poster_path} />
                  { firstTrailer && <VideoTrailer url={firstTrailer} loading={videos.loading}/> }

                  <div style={{display: 'flex', flexDirection: 'column', gap: '.625rem'}}>
                    <Videos videos={videos} englishVideo={englishVideo} />
                    <Images category={category} id={id} />
                  </div>
                </div>

                <div className={style.top__bottom}>
                  <ul className={style.top__bottom_genres}>
                    {details.res?.genres?.map(({id, name}) => (
                      <li key={id}>{name}</li>
                    ))}
                  </ul>

                  <div className={style.top__bottom_block}>
                    <Details id={id} category={category} {...details.res && details.res} />
                    <div>
                      <AddToWatchlist orange/>
                    </div>
                  </div>

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