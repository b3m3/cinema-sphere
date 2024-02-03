import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchDetails, fetchVideos, fetchEnglishVideo, fetchImages } from '../../store/slices/fetchDataSlice';
import { getHistory, setHistory } from '../../store/slices/historySlice';

import Rating from '../../components/rating/Rating';
import VideoTrailer from '../../components/videoTrailer/VideoTrailer';
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
import MediaSwiper from '../../components/mediaSwiper/MediaSwiper';
import Reviews from '../../components/reviews/Reviews';
import Keywords from '../../components/keywords/Keywords';
import Rate from '../../components/rate/Rate';
import SideTrending from '../../components/sideTrending/SideTrending';
import Popularity from '../../components/popularity/Popularity';
import TvSeasons from '../../components/tvSeasons/TvSeasons';

import style from './tv-series-details-page.module.scss';

const TvSeriesDetailsPage = () => {
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

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  useEffect(() => {
    if (details) {
      const poster_path = details?.res?.poster_path;
      const doc = {id, poster_path, category};
  
      dispatch(setHistory(doc));
    }
  }, [dispatch, details, id, category]);

  const getFirstTrailerUrl = useMemo(() => {
    return videos.res?.results.length > 0 ? videos.res.results[0].key 
      : englishVideo.res?.results.length > 0 ? englishVideo.res.results[0].key : null;
  }, [videos, englishVideo]);

  const title = details.res?.name;
  const isEnded = details.res?.status === 'Ended';
  const releaseDate = details.res?.first_air_date && moment(details.res?.first_air_date).format('YYYY');
  const lastDate = isEnded && details.res?.last_air_date && ` - ${moment(details.res?.last_air_date).format('YYYY')}`;

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
                    <h1>{title}</h1>
                    <ul>
                      <li>{releaseDate}{lastDate}</li>
                      { 
                        Boolean(details.res.episode_run_time?.length) &&
                          <li><Time minutes={details.res.episode_run_time}/></li>
                      }
                    </ul>
                  </div>
                  <div className={style.top__head_right}>
                    <Rating rating={details.res.vote_average} vote_count={details.res.vote_count} />
                    <Rate id={id} category={category} title={details.res?.name}/>
                    <Popularity popularity={details.res?.popularity} />
                  </div>
                </div>

                <div className={style.top__center}>
                  <PosterImage title={details.res.title} poster_path={details.res.poster_path} />
                  <VideoTrailer url={getFirstTrailerUrl} loading={videos.loading} backdrop={details.res.backdrop_path}/>

                  <div className={style.top__center_box}>
                    <VideosButton videos={videos} englishVideo={englishVideo} category={category} id={id} />
                    <ImagesButton images={images} category={category} id={id} />
                  </div>
                </div>

                <div className={style.top__bottom}>
                  <MediaGenres genres={details.res?.genres} category={category} />

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
                  <TvSeasons id={id} category={category} seasons={details.res?.seasons} lang={lang} />
                  <MediaCasts id={id} category={category} lang={lang} />
                  <MediaSwiper id={id} category={category} lang={lang} title={'Similar'} />
                  <Reviews id={id} category={category} />
                </div>

                <aside className={style.body__right}>
                  <Keywords category={category} id={id} />
                  <SideTrending lang={lang} category={category}id={id} />
                  <Recommendations id={id} category={category} lang={lang} />
                </aside>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default TvSeriesDetailsPage;