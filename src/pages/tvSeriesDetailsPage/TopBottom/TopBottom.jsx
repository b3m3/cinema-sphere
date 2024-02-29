import AddToWatchlist from "../../../components/addToWatchlist/AddToWatchlist";
import Genres from "../../../components/Genres/Genres";

import style from './TopBottom.module.scss';

const TopBottom = ({genres, category}) => {
  return (
    <div className={style.bottom}>
      <Genres genres={genres} category={category} />

      <div className={style.bottom_block}>
        <i></i>
        {/*<Details id={id} category={category} {...details.res && details.res} />*/}
        <div>
          <AddToWatchlist orange/>
        </div>
      </div>

    </div>
  );
};

export default TopBottom;