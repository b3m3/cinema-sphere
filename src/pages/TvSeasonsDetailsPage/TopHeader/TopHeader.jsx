import Rating from "../../../components/Rating/Rating";
import FirstLastAirDates from "../../../components/FirstLastAirDates/FirstLastAirDates";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";

import style from './TopHeader.module.scss';

const TopHeader = ({ id, category, season, title, tvSeriesName, air_date, vote_average }) => {

  return (
    <div className={style.head}>
      <div className={style.head__left}>
        <Breadcrumbs
          id={id}
          category={category}
          season={season}
          seasonName={title}
          tvSeriesName={tvSeriesName}
        />

        <div className={style.head__left_box}>
          <FirstLastAirDates release={air_date} />
        </div>
      </div>

      <div className={style.head__right}>
        <Rating rating={vote_average} vote_count={true} />
      </div>
    </div>
  );
};

export default TopHeader;