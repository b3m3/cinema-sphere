import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { getHistory, setHistory } from '../../store/slices/historySlice';
import { fetchDetails } from "../../store/asyncThunks/fetchDetails";
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';

import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import TopCenter from "./TopCenter/TopCenter";
import TopHeader from "./TopHeader/TopHeader";
import TopBottom from "./TopBottom/TopBottom";
import BodyMain from "./BodyMain/BodyMain";
import BodyAside from "./BodyAside/BodyAside";

import style from './MovieDetailsPage.module.scss';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { lang } = useSelector(state => state.lang);
  const details = useSelector(state => state.details);

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  useEffect(() =>{
    dispatch(fetchDetails({category, lang, id}))
  }, [dispatch, category, lang, id]);

  const memoizedId = useMemo(() => id, [id]);
  const memoizedLang = useMemo(() => lang, [lang]);
  const memoizedCategory = useMemo(() => category, [category]);

  const { backdrop_path, genres, homepage, overview, popularity, poster_path, production_countries, production_companies,
    release_date, runtime, spoken_languages, status, title, vote_average, vote_count, budget } = {...details?.res};

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  useEffect(() => {
    if (details) {
      dispatch(setHistory({id, poster_path, category}));
    }
  }, [dispatch, details, id, poster_path, category]);

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
                <BackgroundImage backdropPath={backdrop_path} />

                <TopHeader
                  id={memoizedId}
                  title={title}
                  status={status}
                  category={memoizedCategory}
                  popularity={popularity}
                  runtime={runtime}
                  release_date={release_date}
                  vote_average={vote_average}
                  vote_count={vote_count}
                />

                <TopCenter
                  id={memoizedId}
                  category={memoizedCategory}
                  lang={memoizedLang}
                  title={title}
                  poster_path={poster_path}
                />

                <TopBottom
                  id={memoizedId}
                  category={memoizedCategory}
                  genres={genres}
                  release_date={release_date}
                  production_countries={production_countries}
                  production_companies={production_companies}
                  homepage={homepage}
                  budget={budget}
                  spoken_languages={spoken_languages}
                />
              </div>
            </div>
          </div>

          <div className={style.body}>
            <div className="container">
              <div className={style.body__wrapp}>
                <BodyMain
                  id={memoizedId}
                  category={memoizedCategory}
                  lang={memoizedLang}
                  overview={overview}
                />

                <BodyAside
                  id={memoizedId}
                  category={memoizedCategory}
                  lang={memoizedLang}
                />
              </div>
            </div>
          </div>
        </>
      }
    </section>
  );
}

export default MovieDetailsPage;