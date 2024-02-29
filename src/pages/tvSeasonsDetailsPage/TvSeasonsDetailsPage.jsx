import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchTvSeasons } from "../../store/asyncThunks/fetchTvSeasons";
import { fetchImages } from "../../store/asyncThunks/fetchImages";
import { fetchEnglishVideo } from "../../store/asyncThunks/fetchEnglishVideo";
import { fetchVideos } from "../../store/asyncThunks/fetchVideos";
import { fetchDetails } from "../../store/asyncThunks/fetchDetails";

import Rating from '../../components/Rating/Rating';
import VideoTrailer from '../../components/videoTrailer/VideoTrailer';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import PosterImage from '../../components/PosterImage/PosterImage';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import VideosBox from '../../components/VideosBox/VideosBox';
import ImagesBox from '../../components/ImagesBox/ImagesBox';
import Overview from '../../components/Overview/Overview';
import MediaCasts from '../../components/MediaCasts/MediaCasts';
import Recommendations from '../../components/Recommendations/Recommendations';
import Keywords from '../../components/Keywords/Keywords';
import TvEpisodes from '../../components/tvEpisodes/TvEpisodes';
import SeasonsSwitcher from '../../components/seasonsSwitcher/SeasonsSwitcher';
import TitleSwitcher from '../../components/titleSwitcher/TitleSwitcher';

import style from './tv-seasons-details-page.module.scss';

const TvSeasonsDetailsPage = () => {
  const {id, season} = useParams();
  const {lang} = useSelector(state => state.lang);
  const {details, videos, englishVideo, images, tvSeasons} = useSelector(state => state);

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  useEffect(() => {
    dispatch(fetchDetails({category, lang, id}))
    dispatch(fetchTvSeasons({lang, season, id}))
    dispatch(fetchVideos({category, season, lang, id}))
    dispatch(fetchEnglishVideo({category, season, id}))
    dispatch(fetchImages({category, season, id}))
  }, [dispatch, category, season, lang, id]);


  const getFirstTrailerUrl = useMemo(() => {
    return videos.res?.results.length > 0 ? videos.res.results[0].key 
      : englishVideo.res?.results.length > 0 ? englishVideo.res.results[0].key : null;
  }, [videos, englishVideo]);

  const titleData = [
    {path: `/tv/${id}`, name: details.res?.name},
    {path: '', name: `Season ${season}`},
  ];

  return (
    <section className={style.wrapp}>
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
                    <TitleSwitcher titleData={titleData} />
                  </div>
                  <div className={style.top__head_right}>
                    <Rating rating={tvSeasons.res.vote_average} vote_count={' '} />
                  </div>
                </div>

                <div className={style.top__center}>
                  <PosterImage title={tvSeasons.res.title} poster_path={tvSeasons.res.poster_path} />
                  <VideoTrailer url={getFirstTrailerUrl} loading={videos.loading} backdrop={tvSeasons.res.poster_path}/>

                  <div className={style.top__center_box}>
                    <VideosBox videos={videos} englishVideo={englishVideo} />
                    <ImagesBox images={images} />
                  </div>
                </div>

                <div  className={style.top__bottom}>
                  <SeasonsSwitcher res={details?.res?.seasons} season={season} />
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
                  <MediaCasts id={id} category={category} lang={lang} season={season} />
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
    </section>
  );
}

export default TvSeasonsDetailsPage;