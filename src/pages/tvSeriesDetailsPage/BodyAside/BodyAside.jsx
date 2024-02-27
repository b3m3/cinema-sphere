import Keywords from "../../../components/keywords/Keywords";
import SideTrending from "../../../components/sideTrending/SideTrending";
import Recommendations from "../../../components/Recommendations/Recommendations";
import style from './BodyAside.module.scss';

const BodyAside = ({ category, lang, id }) => {
  return (
    <aside className={style.wrapp}>
      <Keywords category={category} id={id}/>
      <SideTrending lang={lang} category={category} id={id}/>
      <Recommendations id={id} category={category} lang={lang}/>
    </aside>
  );
};

export default BodyAside;