import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { fetchSearch } from '../../store/slices/fetchDataSlice';

import PageSwitcher from '../../components/pageSwitcher/PageSwitcher';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import MediaCard from '../../components/mediaCard/MediaCard';
import CelebCard from '../../components/celebCard/CelebCard';

import style from './search-page.module.scss';

const SearchPage = () => {
  const {lang} = useSelector(state => state.lang);
  const {loading, status, res} = useSelector(state => state.search.search);
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
          {res?.results.map((params) => (
            isCeleb
             ? <CelebCard key={params.id} {...params} category={category} />
             : <MediaCard key={params.id} {...params} category={category} />
          ))}
        </div>
        <PageSwitcher total_pages={res?.total_pages} page={page} />
      </section>
    </div>
  );
}

export default SearchPage;