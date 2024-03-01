import {useEffect, useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchDetails } from "../../store/asyncThunks/fetchDetails";
import { getHistory, setHistory } from '../../store/slices/historySlice';

import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import TopHeader from "./TopHeader/TopHeader";
import TopBody from "./TopBody/TopBody";
import BodyMain from "./BodyMain/BodyMain";
import BodyAside from "./BodyAside/BodyAside";

import style from './CelebDetailsPage.module.scss';

const CelebDetailsPage = () => {
  const { id} = useParams();
  const { lang } = useSelector(state => state.lang);
  const details = useSelector(state => state.details);

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  const memoizedId = useMemo(() => id, [id]);
  const memoizedLang = useMemo(() => lang, [lang]);
  const memoizedCategory = useMemo(() => category, [category]);

  useEffect(() => {
    dispatch(fetchDetails({category, lang, id}));
  }, [dispatch, category, lang, id]);

  const { profile_path, popularity, name, homepage, deathday, biography, birthday, known_for_department,
    place_of_birth } = {...details?.res};

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  useEffect(() => {
    if (details) {
      dispatch(setHistory({id, poster_path: profile_path, category}));
    }
  }, [dispatch, details, profile_path, id, category]);

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

                  <TopHeader
                    name={name}
                    popularity={popularity}
                    knownFor={known_for_department}
                    birthday={birthday}
                    deathday={deathday}
                  />

                  <TopBody
                    name={name}
                    posterPath={profile_path}
                    birthday={birthday}
                    deathday={deathday}
                    homepage={homepage}
                    category={memoizedCategory}
                    placeOfBirth={place_of_birth}
                  />
                </div>
              </div>
            </div>

            <div className={style.body}>
              <div className="container">
                <div className={style.body__wrapp}>
                  <BodyMain
                    id={memoizedId}
                    lang={memoizedLang}
                    biography={biography}
                    name={name}
                  />

                  <BodyAside
                    id={memoizedId}
                    lang={memoizedLang}
                    category={memoizedCategory}
                  />
                </div>
              </div>
            </div>
        </>
      }
    </section>
  );
}

export default CelebDetailsPage;