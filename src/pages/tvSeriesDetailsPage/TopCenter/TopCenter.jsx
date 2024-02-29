import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchVideos} from "../../../store/asyncThunks/fetchVideos";
import {fetchImages} from "../../../store/asyncThunks/fetchImages";

import PosterImage from "../../../components/PosterImage/PosterImage";
import VideoTrailer from "../../../components/videoTrailer/VideoTrailer";
import ImagesBox from "../../../components/ImagesBox/ImagesBox";
import VideosButton from "../../../components/videosButton/VideosButton";

import style from './TopCenter.module.scss';

const TopCenter = ({id, category, lang, name, poster_path, backdrop_path}) => {
  // const videos = useSelector(state => state.videos);

  // const getFirstTrailerUrl = useMemo(() => {
  //   return videos.res?.results?.length > 0 ? videos.res.results[0].key : null;
  // }, [videos]);

  // console.log(getFirstTrailerUrl)

  // useEffect(() =>{
  //   dispatch(fetchVideos({category, lang, id}))
  //   dispatch(fetchImages({category, id}))
  // }, [dispatch, category, lang, id]);

  return (
    <div className={style.center}>
      <PosterImage title={name} posterPath={poster_path}/>
      {/*<VideoTrailer url={getFirstTrailerUrl} loading={videos.loading} backdrop={backdrop_path}/>*/}

      <div className={style.center_box}>
        {/*<VideosButton videos={videos} />*/}
        <ImagesBox id={id} category={category} lang={lang} />
      </div>
    </div>
  );
};

export default TopCenter;