import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { fetchImages, fetchVideos, fetchEnglishVideo } from '../../store/slices/fetchDataSlice';
import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { IMAGE_URL } from '../../constants/api';

import { IoIosCloseCircleOutline } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { PiArrowSquareLeft, PiArrowSquareRight } from "react-icons/pi";

import style from './gallery-modal-page.module.scss';

const GalleryModal = () => {
  const [count, setCount] = useState(1);

  const {lang} = useSelector(state => state.lang);
  const {videos} = useSelector(state => state.videos);
  const {images} = useSelector(state => state.images);
  const {englishVideo} = useSelector(state => state.englishVideo);
  const dispatch = useDispatch();

  const bodyRef = useRef(null);

  const {id, modal} = useParams();
  const category = useCategoryFromLocation();

  const isModalImages = modal === 'images';
  const isModalVideos = modal === 'videos';

  useEffect(() => {
    if (isModalImages) {
      dispatch(fetchImages({category, id}));
      return;
    } 
    if (isModalVideos) {
      dispatch(fetchVideos({category, lang, id}));
      dispatch(fetchEnglishVideo({category, id}));
      return;
    }
  }, [dispatch, category, lang, id, isModalImages, isModalVideos]);

  const getImagesRes = () => {
    return images.res?.backdrops ? images.res?.backdrops : images.res?.profiles ? images.res?.profiles : null;
  };

  const imagesRes = getImagesRes();

  const videoResults = useMemo(() => {
    return videos.res?.results.length > 0 ? videos.res?.results
      : englishVideo.res?.results.length > 0 ? englishVideo.res?.results : null;
  }, [videos, englishVideo]);

  const imageResults = useMemo(() => {
    return imagesRes?.length > 0 ? imagesRes : null;
  }, [imagesRes]);

  const nextSlide = useCallback(() => {
    const length = isModalImages ? imageResults.length : isModalVideos ? videoResults?.length : null;
    return setCount(c => length && c < length ? c + 1 : 1);
  }, [isModalImages, imageResults, isModalVideos, videoResults])

  const prevSlide = useCallback(() => {
    const length = isModalImages ? imageResults.length : isModalVideos ? videoResults?.length : null;
    setCount(c => length && c <= 1 ? length : c - 1);
  }, [isModalImages, imageResults, isModalVideos, videoResults])
  
  const scrollToBody = useCallback(() => bodyRef.current.scrollIntoView(), []);
  const scrollToTop = useCallback(() => window.scrollTo(0, 0), []);

  return (
    <div className={style.wrapp}>
      <div className="container">
        <div className={style.top}>
          <div className={style.top_head}>
            <div className={style.counter}>
              <span>{count}</span>
              <span>of</span>
              <span>
                {isModalImages && imageResults?.length}
                {isModalVideos && videoResults?.length}
              </span>
            </div>
            <CgMenuGridR className={style.scroll} onClick={scrollToBody} />

            <Link className={style.close} to={`/${category}/${id}`}>
              <IoIosCloseCircleOutline />
            </Link>
          </div>
          <div className={style.top_main}>
            {
              isModalImages &&
                <img 
                  src={`${IMAGE_URL}original${imageResults?.[count -1].file_path}`}
                  alt="backdrop" 
                />
            }
            {
              isModalVideos &&
                <iframe
                  src={videoResults && `https://www.youtube.com/embed/${videoResults[count -1].key}/?autoplay=${1}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                />
            }
          </div>
          <div className={style.top_navigate}>
            <button className={style.left_btn} onClick={prevSlide}>
              <PiArrowSquareLeft />
            </button>
            <button className={style.right_btn} onClick={nextSlide}>
              <PiArrowSquareRight />
            </button>
          </div>
        </div>

        <div className={style.body} ref={bodyRef}>
          {
            isModalImages && imageResults?.map(({file_path}, i) => (
              <img 
                key={i}
                src={`${IMAGE_URL}w185${file_path}`}
                className={i === count -1 ? style.active : null}
                onClick={() => {setCount(i + 1); scrollToTop()}}
                alt="backdrop" 
              />
            ))
          }
          {
            isModalVideos && videoResults?.map(({key}, i) => (
              <img
                key={i}
                src={`https://img.youtube.com/vi/${key}/maxresdefault.jpg`}
                className={i === count -1 ? style.active : null}
                onClick={() =>  {setCount(i + 1); scrollToTop()}}
                alt="backdrop"
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default GalleryModal;