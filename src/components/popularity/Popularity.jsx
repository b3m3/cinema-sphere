import { IoIosTrendingUp } from "react-icons/io";

import style from './popularity.module.scss';

const Popularity = ({popularity}) => {
  return (
    <div className={style.wrapp}>
      <h4>Popularity</h4>

      <div className={style.box}>
        <IoIosTrendingUp />
        <p>{popularity}</p>
      </div>
    </div>
  );
}

export default Popularity;