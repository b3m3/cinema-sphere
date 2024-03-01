import Overview from "../../../components/Overview/Overview";
import MediaCasts from "../../../components/MediaCasts/MediaCasts";
import Reviews from "../../../components/Reviews/Reviews";
import Similar from "../../../components/Similar/Similar";

import style from './BodyMain.module.scss';

const BodyMain = ({ id, category, lang, overview }) => {
  return (
    <div className={style.wrapp}>
      <Overview overview={overview}/>
      <MediaCasts id={id} category={category} lang={lang}/>
      <Similar id={id} category={category} lang={lang} />
      <Reviews id={id} category={category}/>
    </div>
  );
};

export default BodyMain;