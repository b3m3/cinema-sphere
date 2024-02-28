import Time from "../../../components/time/Time";
import Rating from "../../../components/Rating/Rating";
import Rate from "../../../components/rate/Rate";
import Popularity from "../../../components/Popularity/Popularity";

import style from './TopHeader.module.scss';

const TopHeader = ({id, name, category, popularity, releaseDate, lastDate, episode_run_time, vote_average, vote_count}) => {
  return (
    <div className={style.head}>
      <div className={style.head_left}>
        <h1>{name}</h1>
        <ul>
          <li>{releaseDate}{lastDate}</li>
          {
            Boolean(episode_run_time?.length) &&
            <li><Time minutes={episode_run_time}/></li>
          }
        </ul>
      </div>
      <div className={style.head_right}>
        <Rating rating={vote_average} vote_count={vote_count}/>
        <Rate id={id} category={category} title={name}/>
        <Popularity popularity={popularity}/>
      </div>
    </div>
  );
};

export default TopHeader;