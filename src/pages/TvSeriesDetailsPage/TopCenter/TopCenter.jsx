import PosterImage from "../../../components/PosterImage/PosterImage";
import Trailer from "../../../components/Trailer/Trailer";
import ImagesBox from "../../../components/ImagesBox/ImagesBox";
import VideosBox from "../../../components/VideosBox/VideosBox";

import style from './TopCenter.module.scss';

const TopCenter = ({id, category, lang, name, poster_path, backdrop_path}) => {
  return (
    <div className={style.center}>
      <PosterImage title={name} posterPath={poster_path}/>
      <Trailer backdrop={backdrop_path}/>

      <div className={style.center_box}>
        <VideosBox id={id} category={category} lang={lang} />
        <ImagesBox id={id} category={category} lang={lang} />
      </div>
    </div>
  );
};

export default TopCenter;