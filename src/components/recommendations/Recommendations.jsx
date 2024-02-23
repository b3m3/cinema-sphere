import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchRecommendations } from "../../store/asyncThunks/fetchRecommendations";
import { fetchGenresList } from "../../store/asyncThunks/fetchGenresList";
import SearchCard from '../searchCard/SearchCard';
import Loading from '../loading/Loading';

import style from './recommendations.module.scss';

const Recommendations = ({id, category, lang}) => {
  const {loading, res} = useSelector(state => state.recommendations);
  const {genresList} = useSelector(state => state);
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