import {useState, useMemo, memo} from "react";
import {useSelector} from "react-redux";

import { FaPlayCircle } from "react-icons/fa";
import { IMAGE_URL } from "../../constants/api";
import Loading from "../Loading/Loading";

import style from './Trailer.module.scss';

const Trailer = memo(({backdrop}) => {
  const [play, setPlay] = useState(false);

  const { res, loading } = useSelector(state => state.videos);

  const firstTrailerUrl = useMemo(() => {
    return res?.results?.length > 0 ? res.results[0].key : null;
  }, [res]);

  const iframeSrc = useMemo(() => {
    return firstTrailerUrl ? `https://www.youtube.com/embed/${firstTrailerUrl}/?autoplay=${play ? 1 : 0}` : '';
  }, [firstTrailerUrl, play])

  const imgSrc = useMemo(() => {
    return firstTrailerUrl ? `https://img.youtube.com/vi/${firstTrailerUrl}/0.jpg` : '';
  }, [firstTrailerUrl]);

  return (
    <div className={style.wrapp}>
      {
        loading
          ? <Loading spinner size={30} />
          : firstTrailerUrl
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
});

export default Trailer;