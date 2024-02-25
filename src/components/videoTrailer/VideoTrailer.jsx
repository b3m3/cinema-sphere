import { useState, useMemo } from "react";
import { FaPlayCircle } from "react-icons/fa";

import { IMAGE_URL } from "../../constants/api";

import Loading from "../Loading/Loading";

import style from './video-trailer.module.scss';

const VideoTrailer = ({url, loading, backdrop}) => {
  const [play, setPlay] = useState(false);

  const iframeSrc = useMemo(() => {
    return url && `https://www.youtube.com/embed/${url}/?autoplay=${play ? 1 : 0}`
  }, [url, play])

  const imgSrc = useMemo(() => {
    return url &&`https://img.youtube.com/vi/${url}/0.jpg`
  }, [url])

  return (
    <div className={style.wrapp}>
      {
        loading
          ? <Loading spinner size={30} />
          : url
            ? <div className={style.box}>  
                <div className={`${style.mask} ${play ? style.hide : ''}`}>
                  <img src={imgSrc} alt="Youtube trailer" />
                  <button onClick={() => setPlay(true)}>
                    <span>
                      <FaPlayCircle /> <b>Play Trailer</b>
                    </span>
                  </button>
                </div>

                <iframe
                  src={iframeSrc}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className={style.iframe}
                />
              </div>
          : backdrop 
            ? <img className={style.backdrop} src={`${IMAGE_URL}w1280${backdrop}`} alt="Backdrop" /> 
            : <span className={style.white} />
      }
    </div>
  );
}

export default VideoTrailer;