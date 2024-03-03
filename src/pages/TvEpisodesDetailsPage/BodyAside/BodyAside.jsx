import Keywords from "../../../components/Keywords/Keywords";
import Recommendations from "../../../components/Recommendations/Recommendations";

import style from './BodyAside.module.scss';

const BodyAside = ({ category, lang, id }) => {
  return (
    <aside className={style.wrapp}>
      <Keywords category={category} id={id}/>
      <Recommendations id={id} category={category} lang={lang}/>
    </aside>
  );
};

export default BodyAside;