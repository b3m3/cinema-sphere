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

import style from './TvSeriesPage.module.scss';

const TvSeriesPage = () => {
  const {page, filter} = useParams();
  const {loading, status, res} = useSelector(state => state.cardData);
  const {lang} = useSelector(state => state.lang)
  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  useEffect(() => {
    scrollToTop();
    dispatch(fetchCardData({category: 'tv', filter, lang, page}));
  }, [dispatch, page, filter, lang]);

  return (
    <div className="container">
      <section className={style.wrapp}>
        <h1>What tv series to watch - Cinema Sphere</h1>
        <MediaSwitcher />
        { loading && <Loading /> }
        <div className={style.body}>
          {res?.results.map(({id, poster_path, name, first_air_date, vote_average}) => (
            <MediaCard
              key={id}
              posterPath={poster_path}
              category={category}
              name={name}
              firstDate={first_air_date}
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

export default TvSeriesPage;