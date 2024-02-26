import {memo, useCallback} from "react";
import {IMAGE_URL} from "../../../constants/api";

import {PiArrowSquareLeft, PiArrowSquareRight} from "react-icons/pi";

import style from './MainGallery.module.scss';

const MainGallery = memo((props) => {
  const {isModalImages, isModalVideos, imageResults, videoResults,  setCount, count} = props;

  const nextSlide = useCallback(() => {
    const length = isModalImages ? imageResults.length : isModalVideos ? videoResults?.length : null;
    return setCount(c => length && c < length ? c + 1 : 1);
  }, [setCount, isModalImages, imageResults, isModalVideos, videoResults])

  const prevSlide = useCallback(() => {
    const length = isModalImages ? imageResults.length : isModalVideos ? videoResults?.length : null;
    setCount(c => length && c <= 1 ? length : c - 1);
  }, [setCount, isModalImages, imageResults, isModalVideos, videoResults])

  return (
    <div className={style.wrapp}>
      <div className={style.body}>
        {
          isModalImages &&
            <img src={`${IMAGE_URL}original${imageResults?.[count - 1]['file_path']}`} alt="backdrop"/>
        }

        {
          isModalVideos &&
            <iframe
              src={videoResults && `https://www.youtube.com/embed/${videoResults[count - 1]['key']}/?autoplay=${1}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
        }
      </div>

      <div className={style.navigate}>
        <button onClick={prevSlide}>
          <PiArrowSquareLeft/>
        </button>
        <button onClick={nextSlide}>
          <PiArrowSquareRight/>
        </button>
      </div>
    </div>
  );
});

export default MainGallery;