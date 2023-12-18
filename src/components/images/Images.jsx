import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GalleryModal from '../galleryModal/GalleryModal';

import { fetchImages } from '../../store/slices/fetchDataSlice';
import { openGallery } from '../../store/slices/gallerySlice';
 
import { FaRegImage } from "react-icons/fa6";

import style from './images.module.scss';

const Images = ({category, id}) => {
  const {images} = useSelector(state => state.images);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(fetchImages({category, id}))
  }, [dispatch, category, id]);

  const numberOfImages = images.res?.posters.length > 0 ? images.res?.posters.length : 0;

  return (
    <>
      <button className={style.wrapp} onClick={null}>
        <FaRegImage />
        <span>
          { numberOfImages > 1 ? numberOfImages + ' PHOTOS' : numberOfImages + ' PHOTO' } 
        </span>
      </button>

      <GalleryModal results={images.res?.posters} />
    </>
  );
}

export default Images;