import moment from "moment/moment";
import style from './ReleaseDate.module.scss';

const ReleaseDate = ({date}) => {
  return (
    <>
      {
        date &&
          <div className={style.wrapp}>
            <h4>Release date</h4>
            <p>{moment(date).format('MMMM DD, YYYY')}</p>
          </div>
      }
    </>
  );
};

export default ReleaseDate;