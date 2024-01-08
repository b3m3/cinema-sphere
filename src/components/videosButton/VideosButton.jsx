import { Link } from "react-router-dom";
import { FaPhotoVideo } from "react-icons/fa";

import style from './videos-button.module.scss';

const VideosButton = ({videos, englishVideo, category, id}) => {
  const numberOfVideos = videos.res?.results.length > 0 ? videos.res?.results.length
    : englishVideo.res?.results.length > 0 ? englishVideo.res?.results.length : 0;

  return (
    <Link className={style.wrapp} to={numberOfVideos > 0 ? `/${category}/${id}/gallery/videos` : ''}>
      <FaPhotoVideo />
      <span>
        { numberOfVideos > 1 ? numberOfVideos + ' VIDEOS' : numberOfVideos + ' VIDEO' } 
      </span>
    </Link>
  );
}

export default VideosButton;