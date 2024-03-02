import {Link} from "react-router-dom";
import moment from "moment";
import PosterImage from "../../../../components/PosterImage/PosterImage";

import style from './SwitcherCard.module.scss';
import {memo} from "react";

const SwitcherCard = memo(({ tvSeriesId, category, name, air_date, episode_count, poster_path, season_number }) => {
  return (
    <div className={style.wrapp}>
      <PosterImage title={name} posterPath={poster_path} />

      <div>
        <h3>
          <Link to={`/${category}/${tvSeriesId}/seasons/${season_number}`}>{ name }</Link>
        </h3>

        <div className={style.wrapp_row}>
          <span>{ moment(air_date).format('DD MMMM, YYYY') }</span>
          <span>{ episode_count && `(${episode_count}) Episodes` }</span>
        </div>
      </div>
    </div>
  );
});

export default SwitcherCard;