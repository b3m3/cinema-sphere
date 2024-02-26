import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { fetchDiscover } from "../../store/asyncThunks/fetchDiscover";

import PageSwitcher from '../../components/PageSwitcher/PageSwitcher';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import MediaCard from '../../components/MediaCard/MediaCard';

import style from './DiscoverPage.module.scss';

const DiscoverPage = () => {
  const {lang} = useSelector(state => state.lang);
  const {loading, status, res} = useSelector(state => state.discover);
  const {category, filters, page} = useParams();
  const dispatch = useDispatch();

  console.log(filters)

  const categoryName = useMemo(() => {
    switch (category) {
      case 'movie':
        return 'Movies';

      case 'tv':
        return 'Tv series';

      default:
        return;
    }
  }, [category]);

  useEffect(() => {
    if(category && filters && lang && page) {
      dispatch(fetchDiscover({category, filters, lang, page}))
    }
  }, [dispatch, category, filters, lang, page]);

  return (
    <div className="container">
      <section className={style.wrapp}>
        <h1>{categoryName}, search - by your filters</h1>
        { loading && <Loading /> }
        { status && <Error status={status} /> }
        <div className={style.body}>
          {res?.results.map(({id, poster_path, first_air_date, release_date, title, name, vote_average}) => (
            <MediaCard
              key={id}
              id={id}
              posterPath={poster_path}
              realese={release_date}
              category={category}
              firstDate={first_air_date}
              title={title}
              name={name}
              rating={vote_average}
            />
          ))}
          { res?.['total_results'] === 0 && <h3>No results found</h3> }
        </div>
        <PageSwitcher total_pages={res?.total_pages} page={page} />
      </section>
    </div>
  );
}

export default DiscoverPage;