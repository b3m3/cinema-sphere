import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrending } from "../../store/asyncThunks/fetchTrending";
import Loading from '../Loading/Loading';
import SearchCard from '../SearchCard/SearchCard';
import SwiperWrapper from "../SwiperWrapper/SwiperWrapper";

import style from './SideTrending.module.scss';

const breakpoints = {
  1024: { slidesPerView: 2, slidesPerGroup: 2 },
  768: { slidesPerView: 7, slidesPerGroup: 7 },
  650: { slidesPerView: 5, slidesPerGroup: 5 },
  475: { slidesPerView: 4, slidesPerGroup: 4 },
  320: { slidesPerView: 2, slidesPerGroup: 2 },
}

const SideTrending = ({category, lang, id, list}) => {
  const { loading, res } = useSelector(state => state.trending);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrending({category: `${category ? category : 'all'}`, lang}))
  }, [dispatch, lang, category]);

  return (
    <>
      { loading && <Loading size={30} black /> }
      {
        res &&        
        <div className={style.wrapp}>
          <h2>Trending</h2>
          {
            list
              ? <ul className={style.list}>
                  {res.results?.slice(0, 10)
                    .map(({id, media_type, name, title, poster_path, profile_path, known_for_department, first_air_date, vote_average}) => {
                      return (
                        <li key={id}>
                          <SearchCard
                            id={id}
                            title={name || title}
                            mediaType={media_type}
                            date={first_air_date}
                            rating={vote_average}
                            posterPath={poster_path || profile_path}
                            knownFor={known_for_department}
                            category={category}
                          />
                        </li>
                      )
                    })}
                </ul>

              : <SwiperWrapper
                  currentId={id}
                  results={res?.results}
                  category={category}
                  breakpoints={breakpoints}
                  btnClass={'side-trending-arrow-'}
                />
          }
        </div>
      }
    </>
  );
}

export default SideTrending;