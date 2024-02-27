import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchImages } from "../../store/asyncThunks/fetchImages";
import { fetchDetails } from "../../store/asyncThunks/fetchDetails";
import { getHistory, setHistory } from '../../store/slices/historySlice';

import Details from '../../components/details/Details';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import PosterImage from '../../components/PosterImage/PosterImage';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import ImagesButton from '../../components/imagesButton/ImagesButton';
import Overview from '../../components/overview/Overview';
import MediaSwiper from '../../components/mediaSwiper/MediaSwiper';
import SideTrending from '../../components/SideTrending/SideTrending';

import style from './celeb-details-page.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import TitleInfo from "./Top/Top";

const CelebDetailsPage = () => {
  const {id} = useParams();
  const {lang} = useSelector(state => state.lang);
  const details = useSelector(state => state.details);
  const images = useSelector(state => state.images);

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
      const poster_path = details?.res?.['profile_path'];
      const doc = {id, poster_path, category};
  
      dispatch(setHistory(doc));
    }
  }, [dispatch, details, id, category]);

  const { profile_path, popularity, name, deathday, biography, birthday, known_for_department } = {...details?.res};

  return (
    <section>
      { details.loading && <Loading /> }
      { details.status && <Error status={details.status} />}

      {
        details.res &&
        <>
          <div className={style.top}>
            <div className="container">
              <div className={style.top__wrapp}>
                <BackgroundImage backdropPath={profile_path} />

                <TitleInfo
                  name={name}
                  popularity={popularity}
                  deathday={deathday}
                  birthday={birthday}
                  known_for_department={known_for_department}
                />

                <div className={style.top__center}>
                  <PosterImage title={name} posterPath={profile_path} />
                  <Details id={id} category={category} {...details.res && details.res} />
                </div>
              </div>
            </div>
          </div>

          <div className={style.body}>
            <div className="container">
              <div className={style.body__wrapp}>
                <div className={style.body__left}>
                  <Overview biography={biography} />
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