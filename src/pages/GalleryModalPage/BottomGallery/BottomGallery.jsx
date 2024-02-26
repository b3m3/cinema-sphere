import {memo, useCallback} from "react";
import {IMAGE_URL} from "../../../constants/api";
import {scrollToTop} from "../../../utils/functions";

import style from './BottomGallery.module.scss';

const BottomGallery = memo((props) => {
  const {bodyRef, isModalImages, imageResults, setCount, count, isModalVideos, videoResults} = props;

  const clickHandler = useCallback((index) => {
    setCount(index + 1);
    scrollToTop();
  }, [setCount])

  return (
    <div className={style.wrapp} ref={bodyRef}>
      {isModalImages && imageResults?.map(({file_path}, i) => (
        <img
          key={file_path + i}
          src={`${IMAGE_URL}w185${file_path}`}
          className={i === count - 1 ? style.active : null}
          onClick={() => clickHandler(i)}
          alt="backdrop"
        />
      ))}

      {isModalVideos && videoResults?.map(({key}, i) => (
        <img
          key={key + i}
          src={`https://img.youtube.com/vi/${key}/0.jpg`}
          className={i === count - 1 ? style.active : null}
          onClick={() => clickHandler(i)}
          alt="backdrop"
        />
      ))}
    </div>
  );
});

export default BottomGallery;