import {calculateAgeWithDOB} from "../../utils/functions";
import moment from "moment/moment";

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
          <p>{moment(birthday).format('MMMM DD, YYYY')} {age && !deathday && `(${age} years)`}</p>
      }
    </>
  );
};

export default Birthday;