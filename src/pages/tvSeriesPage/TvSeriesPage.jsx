import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchCardData } from '../../store/slices/fetchDataSlice';
import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { scrollToTop } from '../../utils/functions';

import Loading from '../../components/loading/Loading';
import PageSwitcher from '../../components/pageSwitcher/PageSwitcher';
import Error from '../../components/error/Error';
import MediaCard from '../../components/mediaCard/MediaCard';
import MediaSwitcher from '../../components/mediaSwitcher/MediaSwitcher';

import style from './tv-series-page.module.scss';

const TvSeriesPage = () => {
  const {page, filter} = useParams();
  const {loading, status, res} = useSelector(state => state.cardData.cardData);
  const {lang} = useSelector(state => state.lang)
  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  useEffect(() => {
    dispatch(fetchCardData({category: 'tv', filter, lang, page}));
    scrollToTop();
  }, [dispatch, page, filter, lang])

  return (
    <div className="container">
      <section className={style.wrapp}>
        <h1>What tv series to watch - Cinema Sphere</h1>
        <MediaSwitcher />
        { loading && <Loading /> }
        <div className={style.body}>
          { res?.results.map((params) => <MediaCard key={params.id} {...params} category={category} />) }
        </div>
        <PageSwitcher total_pages={res?.total_pages} page={page} />
        { status && <Error status={status} /> }
      </section>
    </div>
  );
}

export default TvSeriesPage;