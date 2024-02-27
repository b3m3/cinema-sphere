import Overview from "../../../components/overview/Overview";
import TvSeasons from "../../../components/tvSeasons/TvSeasons";
import MediaCasts from "../../../components/mediaCasts/MediaCasts";
import Reviews from "../../../components/Reviews/Reviews";
import style from './BodyMain.module.scss';

const BodyMain = ({ id, category, lang, overview, seasons }) => {
  return (
    <div className={style.wrapp}>
      <Overview overview={overview}/>
      <TvSeasons id={id} category={category} seasons={seasons} lang={lang}/>
      <MediaCasts id={id} category={category} lang={lang}/>
      {/*<MediaSwiper id={id} category={category} lang={lang} Title={'Similar'} />*/}
      <Reviews id={id} category={category}/>
    </div>
  );
};

export default BodyMain;