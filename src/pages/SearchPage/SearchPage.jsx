import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { fetchSearch } from "../../store/asyncThunks/fetchSearch";

import PageSwitcher from '../../components/PageSwitcher/PageSwitcher';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import MediaCard from '../../components/MediaCard/MediaCard';
import CelebCard from '../../components/CelebCard/CelebCard';

import style from './SearchPage.module.scss';

const SearchPage = () => {
  const {lang} = useSelector(state => state.lang);
  const {loading, status, res} = useSelector(state => state.search);
  const {category, value, page} = useParams();
  const dispatch = useDispatch();

  const isCeleb = category === 'person';

  const categoryName = useMemo(() => {
    switch (category) {
      case 'person':
        return 'Celebrity';

      case 'movie':
        return 'Movies';

      case 'tv':
        return 'Tv series';

      default:
        return;
    }
  }, [category]);

  useEffect(() => {
    if(category && value && page && lang) {
      dispatch(fetchSearch({category, value, page, lang}))
    }
  }, [dispatch, category, value, page, lang]);

  return (
    <div className="container">
      <section className={style.wrapp}>
        <h1>{categoryName}, search - {value}</h1>
        { loading && <Loading /> }
        { status && <Error status={status} /> }
        <div className={`${style.body} ${isCeleb && style.body_seleb}`}>
          {res?.results.map(({id, poster_path, profile_path, known_for_department, release_date, title, name, first_air_date, vote_average}) => {
            return (
              isCeleb
                ? <CelebCard
                    key={id}
                    id={id}
                    knownFor={known_for_department}
                    category={category}
                    name={name}
                    profilePath={profile_path}
                  />
                : <MediaCard
                    key={id}
                    id={id}
                    posterPath={poster_path}
                    realese={release_date}
                    category={category}
                    title={title}
                    name={name}
                    firstDate={first_air_date}
                    rating={vote_average}
                  />
            )
          })}
        </div>
        <PageSwitcher total_pages={res?.total_pages} page={page} />
      </section>
    </div>
  );
}

export default SearchPage;