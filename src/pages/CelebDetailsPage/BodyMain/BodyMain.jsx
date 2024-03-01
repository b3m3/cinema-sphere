import Overview from "../../../components/Overview/Overview";
import ActorFilmography from "../../../components/ActorFilmography/ActorFilmography";

import style from './BodyMain.module.scss';

const BodyMain = ({ id, lang, name, biography }) => {
  return (
    <div className={style.wrapp}>
      <Overview overview={biography}/>
      <ActorFilmography id={id} lang={lang} name={name} />
    </div>
  );
};

export default BodyMain;