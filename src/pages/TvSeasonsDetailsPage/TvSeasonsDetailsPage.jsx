import {useEffect, useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchTvSeasons } from "../../store/asyncThunks/fetchTvSeasons";

import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import BodyMain from "./BodyMain/BodyMain";
import BodyAside from "./BodyAside/BodyAside";
import TopHeader from "./TopHeader/TopHeader";
import TopCenter from "./TopCenter/TopCenter";
import SeasonsSwitcher from "./SeasonsSwitcher/SeasonsSwitcher";

import style from './TvSeasonsDetailsPage.module.scss';

const TvSeasonsDetailsPage = () => {
  const { id, season } = useParams();
  const { lang } = useSelector(state => state.lang);
  const tvSeasons = useSelector(state => state.tvSeasons);

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  const memoizedId = useMemo(() => id, [id]);
  const memoizedLang = useMemo(() => lang, [lang]);
  const memoizedCategory = useMemo(() => category, [category]);

  useEffect(() => {
    dispatch(fetchTvSeasons({lang, season, id}));
  }, [dispatch, category, season, lang, id]);

  const { air_date, episodes, name, overview, poster_path, vote_average, vote_count, season_number } = {...tvSeasons?.res};

  return (
    <section>
      { tvSeasons.loading && <Loading /> }
      { tvSeasons.status && <Error status={tvSeasons.status} />}

      {
        tvSeasons.res &&
          <>
            <div className={style.top}>
              <div className="container">
                <div className={style.top__wrapp}>
                  <BackgroundImage backdropPath={poster_path} />

                  <TopHeader
                    id={memoizedId}
                    category={memoizedCategory}
                    title={name}
                    air_date={air_date}
                    season_number={season_number}
                    vote_average={vote_average}
                    vote_count={vote_count}
                  />

                  <TopCenter
                    id={memoizedId}
                    category={memoizedCategory}
                    lang={memoizedLang}
                    season_number={season_number}
                    poster_path={poster_path}
                    title={name}
                  />

                  <SeasonsSwitcher
                    id={memoizedId}
                    lang={memoizedLang}
                    tvSeriesId={memoizedId}
                    category={memoizedCategory}
                    season={season_number}
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
                    episodes={episodes}
                    season_number={season_number}
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

export default TvSeasonsDetailsPage;