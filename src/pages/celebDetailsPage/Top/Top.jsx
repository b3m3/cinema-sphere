import Popularity from "../../../components/Popularity/Popularity";
import {useMemo} from "react";
import style from './Top.module.scss';

const Top = ({name, deathday, birthday, known_for_department, popularity}) => {
  const deathDay = useMemo(() => {
    return deathday && birthday && `(${birthday.slice(0, 4)} - ${deathday.slice(0, 4)})`;
  }, [deathday, birthday]);

  return (
    <div className={style.wrapp}>
      <div className={style.left}>
        <h1>
          {name && name}
          {deathDay && <span>{deathDay}</span>}
        </h1>

        <p>{known_for_department && known_for_department}</p>
      </div>

      <div className={style.right}>
        <Popularity popularity={popularity}/>
      </div>
    </div>
  );
};

export default Top;