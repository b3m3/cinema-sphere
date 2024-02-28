import Time from "../../../components/Time/Time";
import Rating from "../../../components/Rating/Rating";
import Rate from "../../../components/Rate/Rate";
import Popularity from "../../../components/Popularity/Popularity";

import style from './TopHeader.module.scss';
import FirstLastAirDates from "../../../components/FirstLastAirDates/FirstLastAirDates";

const TopHeader = (props) => {
  const {id, name, category, popularity, first_air_date, last_air_date, episode_run_time, vote_average, status,
    vote_count} = props;

  return (
    <div className={style.head}>
      <div className={style.head__left}>
        <h1>{name}</h1>

        <div className={style.head__left_box}>
          <Time minutes={episode_run_time} />
          <FirstLastAirDates release={first_air_date} endDate={last_air_date} status={status} />
        </div>
      </div>

      <div className={style.head__right}>
        <Rating rating={vote_average} vote_count={vote_count}/>
        <Rate id={id} category={category} title={name}/>
        <Popularity popularity={popularity}/>
      </div>
    </div>
  );
};

export default TopHeader;