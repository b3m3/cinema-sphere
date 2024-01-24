import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchKeywords } from '../../store/slices/fetchDataSlice';

import style from './keywords.module.scss';

const Keywords = ({category, id}) => {
  const {res} = useSelector(state => state.keywords.keywords);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchKeywords({category, id}))
  }, [dispatch, category, id]);

  return (
    <>
      {
        res?.keywords.length > 0 &&
          <div className={style.wrapp}>
            <h2>Keywords</h2>

            <ul>
              {res?.keywords?.map(({id, name}) => (
                <li key={id}>
                  <Link to={`/discover/${category}/&include_adult=false&with_keywords=${id}&/1`}>
                    #{name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
      }
    </>
  );
}

export default Keywords;