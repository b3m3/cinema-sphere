import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchDetails } from "../../store/asyncThunks/fetchDetails";
import { getHistory, setHistory } from '../../store/slices/historySlice';

import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import BodyAside from "./BodyAside/BodyAside";
import BodyMain from "./BodyMain/BodyMain";

import style from './tv-series-details-page.module.scss';
import BackgroundImage from "../../components/BackgroundImage/BackgroundImage";
import TopHeader from "./TopHeader/TopHeader";
import PosterImage from "../../components/PosterImage/PosterImage";
import VideoTrailer from "../../components/videoTrailer/VideoTrailer";
import ImagesButton from "../../components/imagesButton/ImagesButton";
import MediaGenres from "../../components/mediaGenres/MediaGenres";
import AddToWatchlist from "../../components/addToWatchlist/AddToWatchlist";
import {fetchVideos} from "../../store/asyncThunks/fetchVideos";
import {fetchImages} from "../../store/asyncThunks/fetchImages";

const TvSeriesDetailsPage = () => {
  const { id } = useParams();
  const { lang } = useSelector(state => state.lang);
  const details = useSelector(state => state.details);
  // const images = useSelector(state => state.images);
  // const videos = useSelector(state => state.videos);

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  const memoizedId = useMemo(() => id, [id]);
  const memoizedLang = useMemo(() => lang, [lang]);
  const memoizedCategory = useMemo(() => category, [category]);

  useEffect(() =>{
    dispatch(fetchDetails({category, lang, id}))
  }, [dispatch, category, lang, id]);

  const { name, status, overview, seasons, poster_path, first_air_date, last_air_date, popularity, episode_run_time,
    vote_average, vote_count, backdrop_path } = {...details?.res};

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  useEffect(() => {
    if (details) {
      dispatch(setHistory({id, poster_path, category}));
    }
  }, [dispatch, details, id, category]);

  // useEffect(() =>{
  //   dispatch(fetchVideos({category, lang, id}))
  //   dispatch(fetchImages({category, id}))
  // }, [dispatch, category, lang, id]);

  // const getFirstTrailerUrl = useMemo(() => {
  //   return videos.res?.results.length > 0 ? videos.res.results[0].key : null;
  // }, [videos]);

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
                <BackgroundImage backdrop_path={backdrop_path}/>

                <TopHeader
                  id={id}
                  name={name}
                  status={status}
                  category={category}
                  popularity={popularity}
                  last_air_date={last_air_date}
                  first_air_date={first_air_date}
                  episode_run_time={episode_run_time}
                  vote_average={vote_average}
                  vote_count={vote_count}
                />

                {/*<div className={style.center}>*/}
                {/*  <PosterImage title={name} poster_path={poster_path}/>*/}
                {/*  <VideoTrailer url={getFirstTrailerUrl} loading={videos.loading} backdrop={backdrop_path}/>*/}

                {/*  <div className={style.center_box}>*/}
                {/*    /!*<VideosButton videos={videos} />*!/*/}
                {/*    <ImagesButton images={images}/>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<div className={style.bottom}>*/}
                {/*  <MediaGenres genres={genres} category={category}/>*/}

                {/*  <div className={style.bottom_block}>*/}
                {/*    /!*<Details id={id} category={category} {...details.res && details.res} />*!/*/}
                {/*    <div>*/}
                {/*      <AddToWatchlist orange/>*/}
                {/*    </div>*/}
                {/*  </div>*/}

                {/*</div>*/}
              </div>
            </div>
          </div>

          <div className={style.body}>
            <div className="container">
              <div className={style.body__wrapp}>
                <BodyMain id={memoizedId} category={memoizedCategory} lang={memoizedLang} overview={overview}
                          seasons={seasons}/>
                <BodyAside id={memoizedId} category={memoizedCategory} lang={memoizedLang}/>
              </div>
            </div>
          </div>
        </>
      }
    </section>
  );
}

export default TvSeriesDetailsPage;