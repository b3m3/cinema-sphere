import WatchlistButton from "../../../components/WatchlistButton/WatchlistButton";
import Genres from "../../../components/Genres/Genres";
import DetailsBox from "./DetailsBox/DetailsBox";

import style from './TopBottom.module.scss';

const TopBottom = (props) => {
  const { id, genres, category, release_date, production_countries, production_companies, homepage,
    budget, spoken_languages } = props;

  return (
    <div className={style.bottom}>
      <Genres genres={genres} category={category} />

      <div className={style.bottom_block}>
        <DetailsBox
          release_date={release_date}
          budget={budget}
          production_countries={production_countries}
          production_companies={production_companies}
          id={id}
          category={category}
          homepage={homepage}
          spoken_languages={spoken_languages}
        />

        <div>
          <WatchlistButton button />
        </div>
      </div>

    </div>
  );
};

export default TopBottom;