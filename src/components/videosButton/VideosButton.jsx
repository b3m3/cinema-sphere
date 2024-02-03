import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPhotoVideo } from "react-icons/fa";

import style from './videos-button.module.scss';

const VideosButton = ({videos, englishVideo}) => {
  const {pathname} = useLocation();

  const numberOfVideos = useMemo(() => {
    return videos.res?.results.length > 0 ? videos.res?.results.length
    : englishVideo.res?.results.length > 0 ? englishVideo.res?.results.length : 0
  }, [videos, englishVideo]);

  const path = numberOfVideos > 0 ? `${pathname}/gallery/videos` : '';
  const count = numberOfVideos > 1 ? numberOfVideos + ' VIDEOS' : numberOfVideos + ' VIDEO';

  return (
    <Link className={style.wrapp} to={path}>
      <FaPhotoVideo />
      <span>{ count }</span>
    </Link>
  );
}

export default VideosButton;