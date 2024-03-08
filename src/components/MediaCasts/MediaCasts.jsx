import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMediaCasts } from "../../store/asyncThunks/fetchMediaCasts";
import CelebCard from '../CelebCard/CelebCard';
import Title from '../Title/Title';

import style from './MediaCasts.module.scss';

const MediaCasts = ({ id, category, lang, episode, season }) => {
  const { res } = useSelector(state => state.mediaCasts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (season && !episode) {
      dispatch(fetchMediaCasts({category, season, id, lang}))
    } else if (season && episode) {
      dispatch(fetchMediaCasts({category, season, episode, id, lang}))
    } else {
      dispatch(fetchMediaCasts({category, id, lang}))
    }
  }, [dispatch, category, episode, season, id, lang]);

  return (
    <>
      {
        Boolean(res?.cast?.length) &&
          <div className={style.wrapp}>
            <Title title={'Top casts'} />

            <ul className={style.list}>
              {res?.cast?.slice(0, 50).map(({id, name, profile_path, character, known_for_department}, i) => {
                return profile_path && (
                  <li key={id + i}>
                    <CelebCard
                      id={id}
                      name={name}
                      knownFor={known_for_department}
                      posterPath={profile_path}
                      category={category}
                      character={character}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
      }
    </>
  );
}

export default MediaCasts;