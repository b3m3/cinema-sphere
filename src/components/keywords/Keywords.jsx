import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchKeywords } from '../../store/slices/fetchDataSlice';

import style from './keywords.module.scss';

const Keywords = ({category, id}) => {
  const {res} = useSelector(state => state.keywords.keywords);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchKeywords({category, id}))
  }, [dispatch, category, id]);

  return (
    <div className={style.wrapp}>
      <h2>Keywords</h2>

      <ul>
        {res?.keywords?.map(({id, name}) => (
          <li key={id}>
            <button>{name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Keywords;