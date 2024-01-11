import { convertMinutesToHoursAndMinutes } from '../../utils/functions';

import style from './time.module.scss';

const Time = ({minutes}) => {
  return (
    <div className={style.wrapp}>
      {convertMinutesToHoursAndMinutes(minutes)}
    </div>
  );
}

export default Time;