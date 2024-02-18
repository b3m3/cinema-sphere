import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchGenresList, fetchRecommendations } from '../../store/slices/fetchDataSlice';
import SearchCard from '../searchCard/SearchCard';
import Loading from '../loading/Loading';

import style from './recommendations.module.scss';

const Recommendations = ({id, category, lang}) => {
  const {loading, res} = useSelector(state => state.recommendations.recommendations);
  const {genresList} = useSelector(state => state.genresList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommendations({id, category, lang}))
    dispatch(fetchGenresList({category, lang}))
  }, [dispatch, id, category, lang]);

  return (
    <>
      {loading && <Loading size={70} black />}

      {
        res?.results?.length > 0 &&
          <div className={style.wrapp}>
            <h2>Recommendations</h2>
      
            <ul>
              {res?.results?.map(props => (
                <li key={props.id}>
                  <SearchCard {...props} genresList={genresList?.res?.genres} category={category} link />
                </li>
              ))}
            </ul>
          </div>
      }
    </>
  );
}

export default Recommendations;