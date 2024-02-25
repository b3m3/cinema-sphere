import LatestMovies from "./LatestMovies/LatestMovies";
import TrendingMovies from './TrendingMovies/TrendingMovies';
import Celebs from "./Celebs/Celebs";
import TopPicks from "./TopPicks/TopPicks";
import TvSeries from "./TvSeries/TvSeries";

import style from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className="container">
      <section className={style.wrapp}>
        <TrendingMovies />
        <Celebs />
        <TopPicks />
        <TvSeries />
        <LatestMovies />
      </section>
    </div>
  );
}

export default HomePage;