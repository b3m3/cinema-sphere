import Rating from "../../../components/Rating/Rating";
import FirstLastAirDates from "../../../components/FirstLastAirDates/FirstLastAirDates";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import EpisodesSwitcher from "../EpisodesSwitcher/EpisodesSwitcher";
import Time from "../../../components/Time/Time";

import style from './TopHeader.module.scss';

const TopHeader = (props) => {
  const { id, lang, category, season_number, runtime, episodeName, air_date, episode_number,
    vote_average, vote_count } = props;

  return (
    <div className={style.head}>
      <div className={style.head__left}>
        <EpisodesSwitcher
          id={id}
          lang={lang}
          category={category}
          season={season_number}
          episode={episode_number}
        />

        <Breadcrumbs
          id={id}
          lang={lang}
          category={category}
          season={season_number}
          seasonName={`Season ${season_number}`}
          episodeName={episodeName}
        />

        <div className={style.head__left_box}>
          <FirstLastAirDates release={air_date} />
          <Time minutes={runtime} />
        </div>
      </div>

      <div className={style.head__right}>
        <Rating rating={vote_average} vote_count={vote_count || true} />
      </div>
    </div>
  );
};

export default TopHeader;