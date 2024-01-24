import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { fetchDiscover } from '../../store/slices/fetchDataSlice';

import PageSwitcher from '../../components/pageSwitcher/PageSwitcher';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import MediaCard from '../../components/mediaCard/MediaCard';

import style from './discover-page.module.scss';

const DiscoverPage = () => {
  const {lang} = useSelector(state => state.lang);
  const {loading, status, res} = useSelector(state => state.discover.discover);
  const {category, filters, page} = useParams();
  const dispatch = useDispatch();

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
      <div className={style.wrapp}>
        <h1>{categoryName}, search - by your filters</h1>
        { loading && <Loading /> }
        { status && <Error status={status} /> }
        <div className={style.body}>
          {res?.results.map((params) => (
            <MediaCard key={params.id} {...params} category={category} />
          ))}
          { res?.total_results === 0 && <h3>No results found</h3> }
        </div>
        <PageSwitcher total_pages={res?.total_pages} page={page} />
      </div>
    </div>
  );
}

export default DiscoverPage;