import Time from "../../../components/Time/Time";
import Rating from "../../../components/Rating/Rating";
import Rate from "../../../components/Rate/Rate";
import Popularity from "../../../components/Popularity/Popularity";
import FirstLastAirDates from "../../../components/FirstLastAirDates/FirstLastAirDates";

import style from './TopHeader.module.scss';

const TopHeader = (props) => {
  const { id, title, category, status, popularity, runtime, release_date, vote_average, vote_count } = props;


  return (
    <div className={style.head}>
      <div className={style.head__left}>
        <h1>{title}</h1>

        <div className={style.head__left_box}>
          <FirstLastAirDates release={release_date} status={status} />
          <Time minutes={runtime} />
        </div>
      </div>

      <div className={style.head__right}>
        <Rating rating={vote_average} vote_count={vote_count}/>
        <Rate id={id} category={category} title={title}/>
        <Popularity popularity={popularity}/>
      </div>
    </div>
  );
};

export default TopHeader;