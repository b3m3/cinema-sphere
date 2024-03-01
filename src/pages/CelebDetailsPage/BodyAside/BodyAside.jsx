import SideTrending from "../../../components/SideTrending/SideTrending";
import ImagesBox from "../../../components/ImagesBox/ImagesBox";

import style from './BodyAside.module.scss';

const BodyAside = ({ category, id, lang }) => {
  return (
    <aside className={style.wrapp}>
      <div className={style.wrapp__images}>
        <ImagesBox lang={lang} category={category} id={id} />
      </div>
      <SideTrending lang={lang} category={category} list />
    </aside>
  );
};

export default BodyAside;