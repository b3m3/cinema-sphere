import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMediaCasts } from '../../store/slices/fetchDataSlice';
import CelebCard from '../celebCard/CelebCard';
import Title from '../title/Title';

import style from './media-casts.module.scss';

const MediaCasts = ({id, category, lang, season}) => {
  const {res} = useSelector(state => state.mediaCasts.mediaCasts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (season) {
      dispatch(fetchMediaCasts({category, season, id, lang}))
    } else {
      dispatch(fetchMediaCasts({category, id, lang}))
    }
  }, [dispatch, category, id, lang]);

  return (
    <div className={style.wrapp}>
      <Title title={'Casts'} />

      <ul className={style.list}>
        {res?.cast?.map((props) => (
          props?.profile_path
            ?  <li key={props.id}>
                <CelebCard {...props} />
              </li>
            : res?.cast?.length < 10
               ? <li key={props.id}>
                    <CelebCard {...props} />
                  </li>
                : null
        ))}
      </ul>
    </div>
  );
}

export default MediaCasts;