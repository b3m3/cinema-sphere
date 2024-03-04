import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchDetails } from "../../store/asyncThunks/fetchDetails";
import { getHistory, setHistory } from '../../store/slices/historySlice';

import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import BackgroundImage from "../../components/BackgroundImage/BackgroundImage";
import BodyAside from "./BodyAside/BodyAside";
import BodyMain from "./BodyMain/BodyMain";
import TopHeader from "./TopHeader/TopHeader";
import TopCenter from "./TopCenter/TopCenter";
import TopBottom from "./TopBottom/TopBottom";

import style from './TvSeriesDetailsPage.module.scss';

const TvSeriesDetailsPage = () => {
  const { id } = useParams();
  const { lang } = useSelector(state => state.lang);
  const details = useSelector(state => state.details);

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  const memoizedId = useMemo(() => id, [id]);
  const memoizedLang = useMemo(() => lang, [lang]);
  const memoizedCategory = useMemo(() => category, [category]);

  useEffect(() =>{
    dispatch(fetchDetails({category, lang, id}))
  }, [dispatch, category, lang, id]);

  const { name, status, overview, seasons, poster_path, first_air_date, last_air_date, popularity, episode_run_time,
    vote_average, vote_count, backdrop_path, genres, air_date, release_date, production_countries, production_companies,
    homepage, spoken_languages, created_by } = {...details?.res};

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  useEffect(() => {
    if (details) {
      dispatch(setHistory({id, poster_path, category}));
    }
  }, [dispatch, details, poster_path, id, category]);

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
                <BackgroundImage backdropPath={backdrop_path}/>

                <TopHeader
                  id={memoizedId}
                  name={name}
                  status={status}
                  category={memoizedCategory}
                  popularity={popularity}
                  last_air_date={last_air_date}
                  first_air_date={first_air_date}
                  episode_run_time={episode_run_time}
                  vote_average={vote_average}
                  vote_count={vote_count}
                />

                <TopCenter
                  id={memoizedId}
                  category={memoizedCategory}
                  lang={memoizedLang}
                  name={name}
                  poster_path={poster_path}
                />

                <TopBottom
                  id={id}
                  category={category}
                  genres={genres}
                  air_date={air_date}
                  release_date={release_date}
                  first_air_date={first_air_date}
                  production_countries={production_countries}
                  production_companies={production_companies}
                  homepage={homepage}
                  spoken_languages={spoken_languages}
                  created_by={created_by}
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
                  seasons={seasons}
                />

                <BodyAside id={memoizedId} category={memoizedCategory} lang={memoizedLang}/>
              </div>
            </div>
          </div>
        </>
      }
    </section>
  );
}

export default TvSeriesDetailsPage;