import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchCardData } from '../../store/asyncThunks/fetchCardData';
import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { scrollToTop } from '../../utils/functions';

import Loading from '../../components/Loading/Loading';
import PageSwitcher from '../../components/PageSwitcher/PageSwitcher';
import Error from '../../components/Error/Error';
import MediaCard from '../../components/MediaCard/MediaCard';
import MediaSwitcher from '../../components/MediaSwitcher/MediaSwitcher';

import style from './MoviesPage.module.scss';

const MoviesPage = () => {
  const {page, filter} = useParams();
  const {loading, status, res} = useSelector(state => state.cardData);
  const {lang} = useSelector(state => state.lang)

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  useEffect(() => {
    dispatch(fetchCardData({category: 'movie', filter, lang, page}));
    scrollToTop();
  }, [dispatch, page, filter, lang])

  return (
    <div className="container">
      <section className={style.wrapp}>
        <h1>What movies to watch - Cinema Sphere</h1>
        <MediaSwitcher />
        { loading && <Loading /> }
        <div className={style.body}>
          {res?.results.map(({id, poster_path, release_date, title, vote_average}) => (
            <MediaCard
              key={id}
              posterPath={poster_path}
              realese={release_date}
              category={category}
              title={title}
              rating={vote_average}
            />
          ))}
        </div>
        <PageSwitcher total_pages={res?.total_pages} page={page} />
        { status && <Error status={status} /> }
      </section>
    </div>
  );
}

export default MoviesPage;