import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchImages } from "../../store/asyncThunks/fetchImages";
import { fetchDetails } from "../../store/asyncThunks/fetchDetails";
import { getHistory, setHistory } from '../../store/slices/historySlice';

import Details from '../../components/details/Details';
import BackgroundImage from '../../components/backgroundImage/BackgroundImage';
import PosterImage from '../../components/posterImage/PosterImage';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import ImagesButton from '../../components/imagesButton/ImagesButton';
import Overview from '../../components/overview/Overview';
import MediaSwiper from '../../components/mediaSwiper/MediaSwiper';
import SideTrending from '../../components/sideTrending/SideTrending';
import Popularity from '../../components/popularity/Popularity';

import style from './celeb-details-page.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';

const CelebDetailsPage = () => {
  const {id} = useParams();
  const {lang} = useSelector(state => state.lang);
  const {details, images} = useSelector(state => state);

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  useEffect(() => {
    dispatch(fetchDetails({category, lang, id}))
    dispatch(fetchImages({category, id}))
  }, [dispatch, category, lang, id]);

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  useEffect(() => {
    if (details) {
      const poster_path = details?.res?.profile_path;
      const doc = {id, poster_path, category};
  
      dispatch(setHistory(doc));
    }
  }, [dispatch, details, id, category]);

  const name = details.res?.name;
  const deathday = details.res?.deathday && details.res?.birthday && `(${moment(details.res.birthday).format('YYYY')} - ${moment(details.res.deathday).format('YYYY')})`
  const knownFor = details.res?.known_for_department && details.res?.known_for_department;

  return (
    <section className={style.wrapp}>
      { details.loading && <Loading /> }
      { details.status && <Error status={details.status} />}

      {
        details.res &&
        <>
          <div className={style.top}>
            <div className="container">
              <div className={style.top__wrapp}>
                <BackgroundImage backdrop_path={details.res.profile_path} />

                <div className={style.top__head}>
                  <div className={style.top__head_left}>
                    <h1>
                      {name} 
                      <span>{deathday}</span>
                    </h1>
                    <ul>
                      <li>{knownFor}</li>
                    </ul>
                  </div>
                  <div className={style.top__head_right}>
                    <Popularity popularity={details.res.popularity} />
                  </div>
                </div>

                <div className={style.top__center}>
                  <PosterImage title={details.res.name} poster_path={details.res.profile_path} />
                  <Details id={id} category={category} {...details.res && details.res} />
                </div>
              </div>
            </div>
          </div>

          <div className={style.body}>
            <div className="container">
              <div className={style.body__wrapp}>
                <div className={style.body__left}>
                  <Overview biography={details.res?.biography} />
                  <MediaSwiper category={category} lang={lang} id={id} title={'Starred in'} />
                </div>

                <aside className={style.body__right}>
                  <div className={style.body__right_images}>
                    <ImagesButton images={images} />
                  </div>
                  <SideTrending lang={lang} category={category} id={id} list={true} />
                </aside>
              </div>
            </div>
          </div>
        </>
      }
    </section>
  );
}

export default CelebDetailsPage;