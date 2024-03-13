import LatestMovies from "./LatestMovies/LatestMovies";
import TrendingMovies from './TrendingMovies/TrendingMovies';
import Celebs from "./Celebs/Celebs";
import TopPicks from "./TopPicks/TopPicks";
import TvSeries from "./TvSeries/TvSeries";

import style from './HomePage.module.scss';

const picksResFirst = ['Anime', 'Comedy', 'Horror'];
const picksResLast = ['Mafia', 'Zombie', '1940s'];

const HomePage = () => {
  return (
    <div className="container">
      <section className={style.wrapp}>
        <TrendingMovies />
        <Celebs />
        <TopPicks results={picksResFirst} />
        <TvSeries />
        <TopPicks results={picksResLast} />
        <LatestMovies />
      </section>
    </div>
  );
}

export default HomePage;