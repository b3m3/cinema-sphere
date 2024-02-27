import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchRecommendations } from "../../store/asyncThunks/fetchRecommendations";
import SearchCard from '../SearchCard/SearchCard';
import Loading from '../Loading/Loading';

import style from './Recommendations.module.scss';

const Recommendations = ({id, category, lang}) => {
  const { loading, res } = useSelector(state => state.recommendations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommendations({id, category, lang}))
  }, [dispatch, id, category, lang]);

  return (
    <>
      { loading && <Loading size={70} black /> }

      {
        Boolean(res?.results?.length) &&
          <div className={style.wrapp}>
            <h2>Recommendations</h2>

            <ul>
              {res?.results?.map(({id, name, media_type, first_air_date, vote_average, poster_path}) => {
                return (
                  <li key={id}>
                    <SearchCard
                      id={id}
                      title={name}
                      mediaType={media_type}
                      date={first_air_date}
                      rating={vote_average}
                      posterPath={poster_path}
                      category={category}
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

export default Recommendations;