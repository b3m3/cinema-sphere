import { convertMinutesToHoursAndMinutes } from '../../utils/functions';
import {memo} from "react";

import style from './time.module.scss';

const Time = memo(({minutes}) => {
  const isArr = minutes && Array.isArray(minutes);
  const isRes = minutes && isArr ? Boolean(minutes.length) : minutes ? minutes : null;

  return (
    <>
      {
        isRes &&
          <p className={style.wrapp}>
            {convertMinutesToHoursAndMinutes(isRes ? minutes[0] : minutes)}
          </p>
      }
    </>
  );
})

export default Time;