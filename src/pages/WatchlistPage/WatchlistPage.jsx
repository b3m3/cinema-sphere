import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo} from "react";
import { useSelector } from "react-redux";

import MediaSwitcher from "../../components/MediaSwitcher/MediaSwitcher";
import Loading from "../../components/Loading/Loading";
import MediaCard from "../../components/MediaCard/MediaCard";
import Error from "../../components/Error/Error";
import EmptyList from "./EmptyList/EmptyList";

import { convertPathToTitle } from "../../utils/functions";

import style from './WatchlistPage.module.scss';

const watchlistArr = ['movies', 'tv_series']

const WatchlistPage = () => {
  const { filter } = useParams();
  const navigate = useNavigate();

  const auth = useSelector(state => state.auth);
  const { movie, tv } = useSelector(state => state.watchlist);

  const category = useMemo(() => {
    return filter === 'tv_series' ? 'tv' : filter === 'movies' ? 'movie' : null;
  }, [filter]);

  const results = useMemo(() => {
      return filter === 'tv_series' ? tv : filter === 'movies' ? movie : null;
  }, [filter, tv, movie]);

  useEffect(() => {
    if (!auth.user?.isAuth) {
      return navigate('/');
    }
  }, [auth, navigate]);

  return (
    <div className="container">
      <section className={style.wrapp}>
        <h1>Watchlist { convertPathToTitle(filter) }</h1>

        <MediaSwitcher results={watchlistArr} />

        { results?.loading && <Loading /> }
        { !results?.status && <Error status={results?.status} /> }
        { results?.res && !Boolean(results?.res?.length) && <EmptyList filter={filter} /> }

        <div className={style.body}>
          {results?.res?.map(({id, poster_path, name, title, release_date, first_air_date, vote_average}) => (
            <MediaCard
              key={id}
              id={id}
              posterPath={poster_path}
              category={category}
              title={name || title}
              date={first_air_date || release_date}
              rating={vote_average}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default WatchlistPage;