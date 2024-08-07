import {memo, useEffect, useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchKeywords } from "../../store/asyncThunks/fetchKeywords";

import style from './Keywords.module.scss';

const Keywords = memo(({category, id}) => {
  const { res } = useSelector(state => state.keywords);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchKeywords({category, id}))
  }, [dispatch, category, id]);

  const results = useMemo(() => {
    return res && res?.keywords ? res.keywords : res?.results ? res.results : null;
  }, [res])

  return (
    <>
      {
        Boolean(results?.length) &&
          <div className={style.wrapp}>
            <h2>Keywords</h2>

            <ul>
              {results?.map(({id, name}) => (
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
});

export default Keywords;