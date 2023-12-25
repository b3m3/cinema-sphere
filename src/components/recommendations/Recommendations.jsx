import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchRecommendations } from '../../store/slices/fetchDataSlice';
import SearchCard from '../searchCard/SearchCard';
import Loading from '../loading/Loading';

import style from './recommendations.module.scss';

const Recommendations = ({id, category, lang}) => {
  const {loading, res} = useSelector(state => state.recommendations.recommendations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommendations({id, category, lang}))
  }, [dispatch, id, category, lang]);

  return (
    <div className={style.wrapp}>
      <h2>Recommendations</h2>

      <ul>
        {res?.results?.map(props => (
          <li key={props.id}>
            <SearchCard {...props} link />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;