import PosterImage from "../../../components/PosterImage/PosterImage";
import Trailer from "../../../components/Trailer/Trailer";
import ImagesBox from "../../../components/ImagesBox/ImagesBox";
import VideosBox from "../../../components/VideosBox/VideosBox";

import style from './TopCenter.module.scss';

const TopCenter = ({ id, category, season_number, episode_number, lang, title, poster_path }) => {
  return (
    <div className={style.center}>
      <PosterImage title={title} posterPath={poster_path}/>
      <Trailer/>

      <div className={style.center_box}>
        <VideosBox id={id} season={`${season_number}`} episode={`${episode_number}`} category={category} lang={lang} />
        <ImagesBox id={id} season={`${season_number}`} episode={`${episode_number}`} category={category} />
      </div>
    </div>
  );
};

export default TopCenter;