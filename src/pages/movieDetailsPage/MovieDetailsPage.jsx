import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchImages } from "../../store/asyncThunks/fetchImages";
import { fetchEnglishVideo } from "../../store/asyncThunks/fetchEnglishVideo";
import { fetchVideos } from "../../store/asyncThunks/fetchVideos";
import { getHistory, setHistory } from '../../store/slices/historySlice';
import { fetchDetails } from "../../store/asyncThunks/fetchDetails";

import Rating from '../../components/Rating/Rating';
import VideoTrailer from '../../components/videoTrailer/VideoTrailer';
import Time from '../../components/time/Time';
import Details from '../../components/details/Details';
import AddToWatchlist from '../../components/addToWatchlist/AddToWatchlist';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import PosterImage from '../../components/PosterImage/PosterImage';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import VideosButton from '../../components/videosButton/VideosButton';
import ImagesButton from '../../components/imagesButton/ImagesButton';
import MediaGenres from '../../components/mediaGenres/MediaGenres';
import Overview from '../../components/Overview/Overview';
import MediaCasts from '../../components/MediaCasts/MediaCasts';
import Recommendations from '../../components/Recommendations/Recommendations';
import MediaSwiper from '../../components/mediaSwiper/MediaSwiper';
import Reviews from '../../components/Reviews/Reviews';
import Keywords from '../../components/Keywords/Keywords';
import Rate from '../../components/rate/Rate';
import SideTrending from '../../components/SideTrending/SideTrending';
import Popularity from '../../components/popularity/Popularity';

import style from './movie-details-page.module.scss';

const MovieDetails = () => {
  const {id} = useParams();
  const {lang} = useSelector(state => state.lang);
  const {details} = useSelector(state => state);
  const {videos} = useSelector(state => state);
  const {images} = useSelector(state => state);
  const {englishVideo} = useSelector(state => state);

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
  }, [dispatch, details, id, category])

  const getFirstTrailerUrl = useMemo(() => {
    return videos.res?.results.length > 0 ? videos.res.results[0].key 
      : englishVideo.res?.results.length > 0 ? englishVideo.res.results[0].key : null;
  }, [videos, englishVideo]);

  const title = useMemo(() => {
    return details.res?.title
  }, [details]);

  const releaseDate = useMemo(() => {
    return details.res?.release_date && moment(details.res?.release_date).format('YYYY')
  }, [details]);
  
  return (
    <section className={style.wrapp}>
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
                      <li>{releaseDate}</li>
                      {
                        Boolean(details.res.runtime) && 
                          <li><Time minutes={details.res.runtime}/></li>
                      }
                    </ul>
                  </div>
                  <div className={style.top__head_right}>
                    <Rating rating={details.res.vote_average} vote_count={details.res.vote_count} />
                    <Rate id={id} category={category} title={title} />
                    <Popularity popularity={details.res?.popularity} />
                  </div>
                </div>

                <div className={style.top__center}>
                  <PosterImage title={details.res.title} poster_path={details.res.poster_path} />
                  <VideoTrailer url={getFirstTrailerUrl} loading={videos.loading} backdrop={details.res.backdrop_path}/>

                  <div className={style.top__center_box}>
                    <VideosButton videos={videos} englishVideo={englishVideo} />
                    <ImagesButton images={images} />
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
    </section>
  );
}

export default MovieDetails;