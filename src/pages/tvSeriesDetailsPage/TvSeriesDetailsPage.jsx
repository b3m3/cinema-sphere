import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchImages } from "../../store/asyncThunks/fetchImages";
import { fetchVideos } from "../../store/asyncThunks/fetchVideos";
import { fetchDetails } from "../../store/asyncThunks/fetchDetails";
import { getHistory, setHistory } from '../../store/slices/historySlice';

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
import Overview from '../../components/overview/Overview';
import MediaCasts from '../../components/mediaCasts/MediaCasts';
import MediaSwiper from '../../components/mediaSwiper/MediaSwiper';
import Reviews from '../../components/reviews/Reviews';
import Rate from '../../components/rate/Rate';
import Popularity from '../../components/popularity/Popularity';
import TvSeasons from '../../components/tvSeasons/TvSeasons';
import BodyAside from "./BodyAside/BodyAside";

import style from './tv-series-details-page.module.scss';

const TvSeriesDetailsPage = () => {
  const { id } = useParams();
  const { lang } = useSelector(state => state.lang);
  const details = useSelector(state => state.details);
  const images = useSelector(state => state.images);
  const videos = useSelector(state => state.videos);

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  useEffect(() =>{
    dispatch(fetchDetails({category, lang, id}))
    dispatch(fetchVideos({category, lang, id}))
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
    return videos.res?.results.length > 0 ? videos.res.results[0].key : null;
  }, [videos]);

  const { name, status, first_air_date } = {...details?.res}

  const isEnded = status && status === 'Ended';

  const releaseDate = first_air_date?.slice(0, 4);
  const lastDate = isEnded && details.res?.last_air_date && ` - ${moment(details.res?.last_air_date).format('YYYY')}`;

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
                    <h1>{ name }</h1>
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
                    <Rate id={id} category={category} title={name}/>
                    <Popularity popularity={details.res?.popularity} />
                  </div>
                </div>

                <div className={style.top__center}>
                  <PosterImage title={name} poster_path={details.res.poster_path} />
                  <VideoTrailer url={getFirstTrailerUrl} loading={videos.loading} backdrop={details.res.backdrop_path}/>

                  <div className={style.top__center_box}>
                    {/*<VideosButton videos={videos} />*/}
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
                  <TvSeasons id={id} category={category} seasons={details.res?.seasons} lang={lang} />
                  <MediaCasts id={id} category={category} lang={lang} />
                  <MediaSwiper id={id} category={category} lang={lang} title={'Similar'} />
                  <Reviews id={id} category={category} />
                </div>

                <BodyAside id={id} category={category} lang={lang} />
              </div>
            </div>
          </div>
        </>
      }
    </section>
  );
}

export default TvSeriesDetailsPage;