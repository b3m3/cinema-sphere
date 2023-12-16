import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchGenresList } from '../../store/slices/fetchDataSlice';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';

import style from './genres-list.module.scss';

const Genres = ({}) => {
  const {lang} = useSelector(state => state.lang);
  const {genresList} = useSelector(state => state.genresList);
  const dispatch = useDispatch();

  const category = useCategoryFromLocation();

  useEffect(() =>{
    dispatch(fetchGenresList({category, lang}))
  }, [dispatch, category, lang]);

  return (
    <div className={style.wrapp}>
      <ul>
        <li></li>
      </ul>
    </div>
  );
}

export default Genres;