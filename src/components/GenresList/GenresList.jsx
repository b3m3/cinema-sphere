import {memo, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchGenresList } from '../../store/slices/fetchDataSlice';

import style from './GenresList.module.scss';

const GenresList = memo(({category, lang}) => {
  const {genresList} = useSelector(state => state.genresList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenresList({category, lang}))
  }, [dispatch, category, lang]);

  return (
    <div className={style.wrapp}>
      <ul>
        {genresList.res?.genres?.map(({id, name}) => (
          <li key={id}>
            <button>{name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
})

export default GenresList;