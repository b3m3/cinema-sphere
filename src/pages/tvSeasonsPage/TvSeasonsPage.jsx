import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchDetails, fetchTvSeasons, fetchVideos, fetchEnglishVideo, fetchImages } from '../../store/slices/fetchDataSlice';

import Rating from '../../components/rating/Rating';
import VideoTrailer from '../../components/videoTrailer/VideoTrailer';
import Time from '../../components/time/Time';
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
import TvEpisodes from '../../components/tvEpisodes/TvEpisodes';

import style from './tv-seasons-page.module.scss';



//-------------------------------------------------------------------------
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useWrapperSwiper } from '../../hooks/useWrapperSwiper';
import 'swiper/css';
import 'swiper/css/navigation';
const breakpoints = {
  1024: { slidesPerView: 10, slidesPerGroup: 6 },
  768: { slidesPerView: 8, slidesPerGroup: 4 },
  650: { slidesPerView: 6, slidesPerGroup: 2 },
  475: { slidesPerView: 5, slidesPerGroup: 2 },
  375: { slidesPerView: 3, slidesPerGroup: 2 },
  320: { slidesPerView: 2, slidesPerGroup: 1 },
}
const SeasonsSwitcher = ({res}) => {
  const SwiperWrapper = useWrapperSwiper(PosterImage)
  return (
    <SwiperWrapper 
      res={{results: res}}
      breakpoints={breakpoints}
      nextEl={'ssbns'}
      prevEl={'ssbps'}
    />
  )
}
//-------------------------------------------------------------------------



const TvSeasonsPage = () => {
  // const [totalSeasons, setTotalSeasons] = useState(null)

  const {id, season} = useParams();
  const {lang} = useSelector(state => state.lang);
  const {details} = useSelector(state => state.details);
  const {tvSeasons} = useSelector(state => state.tvSeasons);
  const {videos} = useSelector(state => state.videos);
  const {images} = useSelector(state => state.images);
  const {englishVideo} = useSelector(state => state.englishVideo);

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  useEffect(() => {
    dispatch(fetchDetails({category, lang, id}))
    dispatch(fetchTvSeasons({lang, season, id}))
    dispatch(fetchVideos({category, lang, id}))
    dispatch(fetchEnglishVideo({category, id}))
    dispatch(fetchImages({category, id}))
  }, [dispatch, category, season, lang, id]);

  // useEffect(() => {
  //   const getAllSeasons = details?.res?.seasons?.map(({season_number}) => season_number);
  //   setTotalSeasons(getAllSeasons);
  // }, [details])

  const getFirstTrailerUrl = useMemo(() => {
    return videos.res?.results.length > 0 ? videos.res.results[0].key 
      : englishVideo.res?.results.length > 0 ? englishVideo.res.results[0].key : null;
  }, [videos, englishVideo]);

  const title = tvSeasons.res?.name;

  // console.log('totalSeasons', totalSeasons);
  // console.log('videos', videos);
  // console.log('images', images);
  // console.log('englishVideo', englishVideo);

  return (
    <div className={style.wrapp}>
      { tvSeasons.loading && <Loading /> }
      { tvSeasons.status && <Error status={tvSeasons.status} />}

      {
        tvSeasons.res &&
        <>
          <div className={style.top}>
            <div className="container">
              <div className={style.top__wrapp}>
                <BackgroundImage backdrop_path={tvSeasons.res.poster_path} />

                <div className={style.top__head}>
                  <div className={style.top__head_left}>
                    <h1>{title}</h1>
                    {/* <ul>
                      <li>{releaseDate}{lastDate}</li>
                      { 
                        Boolean(tvSeasons.res.episode_run_time?.length) &&
                          <li><Time minutes={tvSeasons.res.episode_run_time}/></li>
                      }
                    </ul> */}
                  </div>
                  <div className={style.top__head_right}>
                    <Rating rating={tvSeasons.res.vote_average} vote_count={' '} />
                    {/* <Rate id={id} category={category} title={tvSeasons.res?.name}/> */}
                    {/* <Popularity popularity={tvSeasons.res?.popularity} /> */}
                  </div>
                </div>

                <div className={style.top__center}>
                  <PosterImage title={tvSeasons.res.title} poster_path={tvSeasons.res.poster_path} />
                  <VideoTrailer url={getFirstTrailerUrl} loading={videos.loading} backdrop={tvSeasons.res.backdrop_path}/>

                  <div className={style.top__center_box}>
                    <VideosButton videos={videos} englishVideo={englishVideo} category={category} id={id} />
                    <ImagesButton images={images} category={category} id={id} />
                  </div>
                </div>

                <div  className={style.top__bottom}>
                  <SeasonsSwitcher res={details?.res?.seasons} />
                </div>
              </div>
            </div>
          </div>

          <div className={style.body}>
            <div className="container">
              <div className={style.body__wrapp}>
                <div className={style.body__left}>
                  <Overview overview={tvSeasons.res?.overview} />
                  <TvEpisodes res={tvSeasons.res?.episodes}/>
                  <MediaCasts id={id} category={category} lang={lang} />
                  <Reviews id={id} category={category} />
                </div>

                <aside className={style.body__right}>
                  <Keywords category={category} id={id} />
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

export default TvSeasonsPage;