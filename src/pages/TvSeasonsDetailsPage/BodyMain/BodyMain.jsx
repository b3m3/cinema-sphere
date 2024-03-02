import Overview from "../../../components/Overview/Overview";
import MediaCasts from "../../../components/MediaCasts/MediaCasts";

import style from './BodyMain.module.scss';
import TvEpisodes from "./TvEpisodes/TvEpisodes";

const BodyMain = ({ id, episodes, category, lang, overview }) => {
  return (
    <div className={style.wrapp}>
      <Overview overview={overview}/>
      <TvEpisodes res={episodes} />
      <MediaCasts id={id} category={category} lang={lang}/>
    </div>
  );
};

export default BodyMain;