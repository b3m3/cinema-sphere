import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchMediaCasts } from '../../store/slices/fetchDataSlice';

import style from './media-casts.module.scss';
import CelebCard from '../celebCard/CelebCard';
import Title from '../title/Title';

const MediaCasts = () => {
  const {res} = useSelector(state => state.mediaCasts.mediaCasts);
  const {lang} = useSelector(state => state.lang);
  const dispatch = useDispatch();
  const {id} = useParams();

  const category = useCategoryFromLocation();

  useEffect(() => {
    dispatch(fetchMediaCasts({category, id, lang}))
  }, [dispatch, category, id, lang]);

  return (
    <div className={style.wrapp}>
      <Title title={'Casts'} />

      <ul className={style.list}>
        {res && res?.cast?.map((props) => (
          props?.profile_path &&
            <li key={props.id}>
              <CelebCard {...props} />
            </li>
        ))}
      </ul>
    </div>
  );
}

export default MediaCasts;