import Overview from "../../../components/Overview/Overview";
import MediaCasts from "../../../components/MediaCasts/MediaCasts";

import style from './BodyMain.module.scss';

const BodyMain = ({ id, category, lang, overview, episode_number, season_number }) => {
  return (
    <div className={style.wrapp}>
      <Overview overview={overview}/>
      <MediaCasts id={id} category={category} lang={lang} season={`${season_number}`} episode={`${episode_number}`} />
    </div>
  );
};

export default BodyMain;