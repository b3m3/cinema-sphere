import { FaPhotoVideo } from "react-icons/fa";

import style from './videos.module.scss';

const Videos = ({videos, englishVideo}) => {
  const numberOfVideos = videos.res?.results.length > 0 ? videos.res?.results.length
    : englishVideo.res?.results.length > 0 ? englishVideo.res?.results.length : 0;

  return (
    <button className={style.wrapp}>
      <FaPhotoVideo />
      <span>
        { numberOfVideos > 1 ? numberOfVideos + ' VIDEOS' : numberOfVideos + ' VIDEO' } 
      </span>
    </button>
  );
}

export default Videos;