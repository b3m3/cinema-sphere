import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { closeGallery } from '../../store/slices/gallerySlice';

import style from './gallery-modal.module.scss';

const GalleryModal = ({results}) => {
  const {gallery} = useSelector(state => state.gallery);
  const dispatch = useDispatch();

  console.log(results && results);

  return (
    <div className={style.wrapp}>
      <div className="container">
        <div className={style.box}>
          <div className={style.top}>
            x closr
          </div>

          <div className={style.body}>

          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryModal;