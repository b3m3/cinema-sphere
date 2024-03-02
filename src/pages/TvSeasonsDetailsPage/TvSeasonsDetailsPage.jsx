import {useEffect, useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { fetchTvSeasons } from "../../store/asyncThunks/fetchTvSeasons";
import { fetchDetails } from "../../store/asyncThunks/fetchDetails";

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
  const details = useSelector(state => state.details);
  const tvSeasons = useSelector(state => state.tvSeasons);

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

  const memoizedId = useMemo(() => id, [id]);
  const memoizedLang = useMemo(() => lang, [lang]);
  const memoizedCategory = useMemo(() => category, [category]);

  useEffect(() => {
    dispatch(fetchDetails({category, lang, id}));
    dispatch(fetchTvSeasons({lang, season, id}));
  }, [dispatch, category, season, lang, id]);

  const { air_date, episodes, name, overview, poster_path, vote_average } = {...tvSeasons?.res};
  const { seasons } = {...details?.res};

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
                  <BackgroundImage backdrop={poster_path} />

                  <TopHeader
                    id={memoizedId}
                    category={memoizedCategory}
                    title={name}
                    tvSeriesName={details.res?.name}
                    air_date={air_date}
                    season={season}
                    vote_average={vote_average}
                  />

                  <TopCenter
                    id={memoizedId}
                    category={memoizedCategory}
                    lang={memoizedLang}
                    season={season}
                    poster_path={poster_path}
                    title={name}
                  />

                  <SeasonsSwitcher
                    tvSeriesId={memoizedId}
                    category={memoizedCategory}
                    season={season}
                    res={seasons}
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
                    season={season}
                    overview={overview}
                    episodes={episodes}
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