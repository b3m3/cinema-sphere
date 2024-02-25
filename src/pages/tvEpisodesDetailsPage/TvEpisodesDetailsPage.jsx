import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchTvSeasons } from "../../store/asyncThunks/fetchTvSeasons";
import { fetchTvEpisodes } from "../../store/asyncThunks/fetchTvEpisodes";
import { fetchImages } from "../../store/asyncThunks/fetchImages";
import { fetchEnglishVideo } from "../../store/asyncThunks/fetchEnglishVideo";
import { fetchVideos } from "../../store/asyncThunks/fetchVideos";
import { fetchDetails } from "../../store/asyncThunks/fetchDetails";

import Rating from '../../components/Rating/Rating';
import VideoTrailer from '../../components/videoTrailer/VideoTrailer';
import BackgroundImage from '../../components/backgroundImage/BackgroundImage';
import PosterImage from '../../components/PosterImage/PosterImage';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import VideosButton from '../../components/videosButton/VideosButton';
import ImagesButton from '../../components/imagesButton/ImagesButton';
import Overview from '../../components/overview/Overview';
import MediaCasts from '../../components/mediaCasts/MediaCasts';
import Recommendations from '../../components/recommendations/Recommendations';
import Keywords from '../../components/keywords/Keywords';
import Time from '../../components/time/Time';
import EpisodesSwitcher from '../../components/episodesSwitcher/EpisodesSwitcher';
import TitleSwitcher from '../../components/titleSwitcher/TitleSwitcher';

import style from './tv-episodes-details-page.module.scss';

const TvEpisodesDetailsPage = () => {
  const {id, season, episode} = useParams();
  const {lang} = useSelector(state => state.lang);
  const {details, images, videos, englishVideo, tvEpisodes, tvSeasons} = useSelector(state => state);

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  useEffect(() => {
    dispatch(fetchDetails({category, lang, id}))
    dispatch(fetchTvEpisodes({lang, season, episode, id}))
    dispatch(fetchTvSeasons({lang, season, id}))
    dispatch(fetchVideos({category, season, episode, lang, id}))
    dispatch(fetchEnglishVideo({category, season, episode, id}))
    dispatch(fetchImages({category, season, episode, id}))
  }, [dispatch, category, season, episode, lang, id]);

  const getFirstTrailerUrl = useMemo(() => {
    return videos.res?.results.length > 0 ? videos.res.results[0].key 
      : englishVideo.res?.results.length > 0 ? englishVideo.res.results[0].key : null;
  }, [videos, englishVideo]);

  const releaseDate = tvEpisodes.res?.air_date && moment(tvEpisodes.res?.air_date).format('YYYY');
  const totalEpisodes = tvSeasons.res?.episodes?.length;

  const titleData = [
    {path: `/tv/${id}`, name: details.res?.name},
    {path: `/tv/${id}/seasons/${season}`, name: `Season ${season}`},
    {path: '', name: `E${episode}. ${tvEpisodes.res?.name}`}
  ];

  return (
    <section className={style.wrapp}>
      { tvEpisodes.loading && <Loading /> }
      { tvEpisodes.status && <Error status={tvEpisodes.status} />}

      {
        tvEpisodes.res &&
        <>
          <div className={style.top}>
            <div className="container">
              <div className={style.top__wrapp}>
                <BackgroundImage backdrop_path={tvEpisodes.res.still_path} />

                <div className={style.top__navigate}>
                  <EpisodesSwitcher totalEpisodes={totalEpisodes} />
                </div>

                <div className={style.top__head}>
                  <div className={style.top__head_left}>
                    <TitleSwitcher titleData={titleData} />

                    <ul>
                      <li>{releaseDate}</li>
                      {
                        tvEpisodes.res.runtime &&
                          <li><Time minutes={tvEpisodes.res.runtime}/></li>
                      }
                    </ul>
                  </div>
                  <div className={style.top__head_right}>
                    <Rating rating={tvEpisodes.res.vote_average} vote_count={tvEpisodes.res.vote_count} />
                  </div>
                </div>

                <div className={style.top__center}>
                  <PosterImage title={tvEpisodes.res.title} poster_path={tvEpisodes.res.still_path} />
                  <VideoTrailer url={getFirstTrailerUrl} loading={videos.loading} backdrop={tvEpisodes.res.still_path}/>

                  <div className={style.top__center_box}>
                    <VideosButton videos={videos} englishVideo={englishVideo} />
                    <ImagesButton images={images} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={style.body}>
            <div className="container">
              <div className={style.body__wrapp}>
                <div className={style.body__left}>
                  <Overview overview={tvEpisodes.res?.overview} />
                  <MediaCasts id={id} category={category} lang={lang} season={season} episode={episode} />
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

export default TvEpisodesDetailsPage;