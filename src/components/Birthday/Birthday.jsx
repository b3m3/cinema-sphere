import {calculateAgeWithDOB} from "../../utils/functions";
import moment from "moment/moment";
import style from './Birthday.module.scss'

const Birthday = ({birthday, deathday}) => {
  const currentYear = new Date().getFullYear();
  const birthYear = moment(birthday).format('YYYY');
  const birthMonth = moment(birthday).format('MM');
  const birthDay = moment(birthday).format('DD');

  const age = calculateAgeWithDOB(currentYear, birthYear, birthMonth, birthDay);

  return (
    <>
      {
        birthday &&
          <div className={style.wrapp}>
            <h4>Birthday</h4>

            <p>{moment(birthday).format('MMMM DD, YYYY')} {age && !deathday && `(${age} years)`}</p>
          </div>
      }
    </>
  );
};

export default Birthday;