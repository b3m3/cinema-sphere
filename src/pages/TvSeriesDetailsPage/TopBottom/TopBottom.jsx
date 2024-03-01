import WatchlistButton from "../../../components/WatchlistButton/WatchlistButton";
import Genres from "../../../components/Genres/Genres";
import DetailsBox from "./DetailsBox/DetailsBox";

import style from './TopBottom.module.scss';

const TopBottom = (props) => {
  const { id, genres, category, air_date, release_date, first_air_date, production_countries,
    production_companies, homepage, budget, spoken_languages, created_by } = props;

  return (
    <div className={style.bottom}>
      <Genres genres={genres} category={category} />

      <div className={style.bottom_block}>
        <DetailsBox
          air_date={air_date}
          release_date={release_date}
          first_air_date={first_air_date}
          budget={budget}
          production_countries={production_countries}
          production_companies={production_companies}
          id={id}
          category={category}
          homepage={homepage}
          spoken_languages={spoken_languages}
          created_by={created_by}
        />

        <div>
          <WatchlistButton orange/>
        </div>
      </div>

    </div>
  );
};

export default TopBottom;