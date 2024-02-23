import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchCardData } from '../../store/asyncThunks/fetchCardData';
import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { scrollToTop } from '../../utils/functions';

import Loading from '../../components/loading/Loading';
import PageSwitcher from '../../components/pageSwitcher/PageSwitcher';
import Error from '../../components/error/Error';
import CelebCard from '../../components/celebCard/CelebCard';

import style from './celebs-page.module.scss';

const CelebsPage = () => {
  const {page, filter} = useParams();
  const {loading, status, res} = useSelector(state => state.cardData);
  const {lang} = useSelector(state => state.lang);
  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  useEffect(() => {
    dispatch(fetchCardData({category: 'person', filter, lang, page}));
    scrollToTop();
  }, [dispatch, page, filter, lang]);

  return (
    <div className="container">
      <section className={style.wrapp}>
        <h1>Celebs - Cinema Sphere</h1>
        { loading && <Loading /> }
        <div className={style.body}>
          { res?.results.map((params) => <CelebCard key={params.id} {...params} category={category} />) }
        </div>
        <PageSwitcher total_pages={res?.total_pages} page={page} />
        { status && <Error status={status} /> }
      </section>
    </div>
  );
}

export default CelebsPage;