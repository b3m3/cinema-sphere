import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import MediaSwitcher from "../../components/MediaSwitcher/MediaSwitcher";
import Loading from "../../components/Loading/Loading";
import MediaCard from "../../components/MediaCard/MediaCard";
import Error from "../../components/Error/Error";

import style from './WatchlistPage.module.scss';
import {convertPathToTitle} from "../../utils/functions";

const watchlistArr = ['movies', 'tv_series']

const WatchlistPage = () => {
  const { filter } = useParams();

  const { movieResults, tvResults } = useSelector(state => state.watchlist);

  const category = useMemo(() => {
    return filter === 'tv_series' ? 'tv' : filter === 'movies' ? 'movie' : null;
  }, [filter]);

  const results = useMemo(() => {
      return filter === 'tv_series' ? tvResults : filter === 'movies' ? movieResults : null;
  }, [filter, tvResults, movieResults]);

  return (
    <div className="container">
      <section className={style.wrapp}>
        <h1>Watchlist { convertPathToTitle(filter) }</h1>

        <MediaSwitcher results={watchlistArr} />

        { results?.loading && <Loading /> }
        { !results?.status && <Error status={results?.status} /> }

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