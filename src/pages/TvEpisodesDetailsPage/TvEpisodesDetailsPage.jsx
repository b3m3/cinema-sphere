import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchTvEpisodes } from "../../store/asyncThunks/fetchTvEpisodes";

import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import TopHeader from "./TopHeader/TopHeader";
import TopCenter from "./TopCenter/TopCenter";
import BodyMain from "./BodyMain/BodyMain";
import BodyAside from "./BodyAside/BodyAside";

import style from './TvEpisodesDetailsPage.module.scss';

const TvEpisodesDetailsPage = () => {
  const { id, season, episode } = useParams();
  const { lang } = useSelector(state => state.lang);
  const tvEpisodes = useSelector(state => state.tvEpisodes);

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  const memoizedId = useMemo(() => id, [id]);
  const memoizedLang = useMemo(() => lang, [lang]);
  const memoizedCategory = useMemo(() => category, [category]);

  useEffect(() => {
    dispatch(fetchTvEpisodes({lang, season, episode, id}))
  }, [dispatch, season, episode, lang, id]);

  const { air_date, still_path, episode_number, name, overview, runtime, season_number,
    vote_average, vote_count } = {...tvEpisodes?.res};

  return (
    <section>
      { tvEpisodes.loading && <Loading /> }
      { tvEpisodes.status && <Error status={tvEpisodes.status} />}

      {
        tvEpisodes.res &&
        <>
          <div className={style.top}>
            <div className="container">
              <div className={style.top__wrapp}>
                <BackgroundImage backdrop={still_path} />

                <TopHeader
                  id={memoizedId}
                  category={memoizedCategory}
                  lang={memoizedLang}
                  air_date={air_date}
                  runtime={runtime}
                  vote_average={vote_average}
                  episode_number={episode_number}
                  season_number={season_number}
                  episodeName={name}
                  vote_count={vote_count}
                />

                <TopCenter
                  id={memoizedId}
                  category={memoizedCategory}
                  lang={memoizedLang}
                  season_number={season_number}
                  episode_number={episode_number}
                  poster_path={still_path}
                  title={name}
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

export default TvEpisodesDetailsPage;