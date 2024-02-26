import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchImages } from "../../store/asyncThunks/fetchImages";
import  { fetchVideos } from "../../store/asyncThunks/fetchVideos";
import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';

import TopGallery from "./TopGallery/TopGallery";
import BottomGallery from "./BottomGallery/BottomGallery";
import MainGallery from "./MainGallery/MainGallery";

import style from './GalleryModalPage.module.scss';

const GalleryModalPage = () => {
  const [count, setCount] = useState(1);

  const {lang} = useSelector(state => state.lang);
  const videos = useSelector(state => state.videos);
  const images = useSelector(state => state.images);

  const dispatch = useDispatch();
  const bodyRef = useRef(null);

  const {id, modal, season, episode} = useParams();
  const category = useCategoryFromLocation();

  const isModalImages = modal === 'images';
  const isModalVideos = modal === 'videos';

  useEffect(() => {
    if (isModalImages) {
      if (season && !episode) {
        dispatch(fetchImages({category, season, id}));
        return;
      }

      if (season && episode) {
        dispatch(fetchImages({category, season, episode, id}));
        return;
      }

      dispatch(fetchImages({category, id}));
      return;
    }
  }, [dispatch, category, season, episode, id, isModalImages])

  useEffect(() => {
    if (isModalVideos) {
      if (season && !episode) {
        dispatch(fetchVideos({category, season, lang, id}));
        return;
      }

      if (season && episode) {
        dispatch(fetchVideos({category, season, episode, lang, id}));
        return;
      }

      dispatch(fetchVideos({category, lang, id}));
      return;
    }
  }, [dispatch, category, season, episode, lang, id, isModalVideos]);

  const imagesRes = useMemo(() => {
    return images.res?.['backdrops']  ? images.res?.['backdrops']
      : images.res?.['profiles'] ? images.res?.['profiles']
      : images.res?.['posters'] ? images.res?.['posters']
      : images.res?.['stills'] ? images.res?.['stills']
      : null;
  }, [images]);


  const videoResults = useMemo(() => {
    return videos.res?.results.length > 0 ? videos.res?.results : null;
  }, [videos]);

  const imageResults = useMemo(() => {
    return imagesRes?.length > 0 ? imagesRes : null;
  }, [imagesRes]);

  return (
    <div className={style.wrapp}>
      <div className="container">
        <div>
          <TopGallery
            isModalImages={isModalImages}
            isModalVideos={isModalVideos}
            imageResults={imageResults}
            videoResults={videoResults}
            category={category}
            id={id}
            season={season}
            episode={episode}
            bodyRef={bodyRef}
            count={count}
          />

          <MainGallery
            isModalImages={isModalImages}
            isModalVideos={isModalVideos}
            imageResults={imageResults}
            videoResults={videoResults}
            setCount={setCount}
            count={count}
          />

          <BottomGallery
            bodyRef={bodyRef}
            isModalImages={isModalImages}
            imageResults={imageResults}
            setCount={setCount}
            count={count}
            isModalVideos={isModalVideos}
            videoResults={videoResults}
          />
        </div>
      </div>
    </div>
  );
}

export default GalleryModalPage;