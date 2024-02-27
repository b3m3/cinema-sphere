import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMediaCasts } from "../../store/asyncThunks/fetchMediaCasts";
import CelebCard from '../CelebCard/CelebCard';
import Title from '../Title/Title';

import style from './media-casts.module.scss';

const MediaCasts = ({id, category, lang, season, episode}) => {
  const {res} = useSelector(state => state.mediaCasts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (season && !episode) {
      dispatch(fetchMediaCasts({category, season, id, lang}))
    } else if (season && episode) {
      dispatch(fetchMediaCasts({category, season, episode, id, lang}))
    } else {
      dispatch(fetchMediaCasts({category, id, lang}))
    } 
  }, [dispatch, category, season, episode, id, lang]);

  return (
    <div className={style.wrapp}>
      <Title title={'Casts'} />

      <ul className={style.list}>
        {res?.cast?.map((props, i) => {
          return (
            props?.profile_path
              ?  <li key={props.id + i}>
                  <CelebCard {...props} />
                </li>
              : res?.cast?.length < 10
                 ? <li key={props.id + i}>
                      <CelebCard {...props} />
                    </li>
                  : null
          )
        })}
      </ul>
    </div>
  );
}

export default MediaCasts;