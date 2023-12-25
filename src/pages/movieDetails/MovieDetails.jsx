import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchDetails, fetchVideos, fetchEnglishVideo, fetchImages } from '../../store/slices/fetchDataSlice';

import Rating from '../../components/rating/Rating';
import VideoTrailer from '../../components/videoTrailer/VideoTrailer';
import Date from '../../components/date/Date';
import Time from '../../components/time/Time';
import Details from '../../components/details/Details';
import AddToWatchlist from '../../components/addToWatchlist/AddToWatchlist';
import BackgroundImage from '../../components/backgroundImage/BackgroundImage';
import PosterImage from '../../components/posterImage/PosterImage';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import VideosButton from '../../components/videosButton/VideosButton';
import ImagesButton from '../../components/imagesButton/ImagesButton';
import MediaGenres from '../../components/mediaGenres/MediaGenres';
import Overview from '../../components/overview/Overview';
import MediaCasts from '../../components/mediaCasts/MediaCasts';
import Recommendations from '../../components/recommendations/Recommendations';

import style from './movie-details.module.scss';
import Similar from '../../components/similar/Similar';

const MovieDetails = () => {
  const {id} = useParams();
  const {lang} = useSelector(state => state.lang);
  const {details} = useSelector(state => state.details);
  const {videos} = useSelector(state => state.videos);
  const {images} = useSelector(state => state.images);
  const {englishVideo} = useSelector(state => state.englishVideo);
  const dispatch = useDispatch();

  const category = useCategoryFromLocation();

  useEffect(() =>{
    dispatch(fetchDetails({category, lang, id}))
    dispatch(fetchVideos({category, lang, id}))
    dispatch(fetchEnglishVideo({category, id}))
    dispatch(fetchImages({category, id}))
  }, [dispatch, category, lang, id]);

  const getFirstTrailer = useMemo(() => {
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
                  <VideoTrailer url={getFirstTrailer} loading={videos.loading}/>

                  <div style={{display: 'flex', flexDirection: 'column', gap: '.625rem'}}>
                    <VideosButton videos={videos} englishVideo={englishVideo} category={category} id={id} />
                    <ImagesButton images={images} category={category} id={id} />
                  </div>
                </div>

                <div className={style.top__bottom}>
                  <MediaGenres genres={details.res?.genres} />

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
                <div className={style.body__left}>
                  <Overview overview={details.res?.overview} />
                  <Similar id={id} category={category} lang={lang} />
                  <MediaCasts id={id} category={category} lang={lang} />
                </div>

                <div className={style.body__right}>
                  <Recommendations id={id} category={category} lang={lang} />
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default MovieDetails;