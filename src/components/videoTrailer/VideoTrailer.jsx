import { useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";

import Loading from "../loading/Loading";

import style from './video-trailer.module.scss';

const VideoTrailer = ({url, loading}) => {
  const [play, setPlay] = useState(false);

  return (
    <div className={style.wrapp}>
      {
        loading
          ? <Loading spinner size={30} />
          : url &&
              <div className={style.box}>  
                <div className={`${style.mask} ${play ? style.hide : ''}`}>
                  <img src={url &&`https://img.youtube.com/vi/${url}/maxresdefault.jpg`} alt="Youtube trailer" />
                  <button onClick={() => setPlay(true)}>
                    <span>
                      <IoPlayCircleOutline style={{fontSize: '5rem'}} /> Play Trailer
                    </span>
                  </button>
                </div>

                <iframe
                  src={url && `https://www.youtube.com/embed/${url}/?autoplay=${play ? 1 : 0}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className={style.iframe}
                />
              </div>
      }
    </div>
  );
}

export default VideoTrailer;