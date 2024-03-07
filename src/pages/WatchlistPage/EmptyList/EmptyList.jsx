import EmptyImg from "../../../assets/images/Empty.png";
import {convertPathToTitle} from "../../../utils/functions";
import style from './EmptyList.module.scss';

const EmptyList = ({filter}) => {
  return (
    <div className={style.empty}>
      <img src={`${EmptyImg}`} alt={'Empty'}/>
      <p>Watchlist <i>{ convertPathToTitle(filter) }</i> is empty !</p>
    </div>
  );
};

export default EmptyList;