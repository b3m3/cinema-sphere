import style from './time.module.scss';

const Time = ({minutes}) => {

  const convertMinutesToHoursAndMinutes = (minutes) => {
    var hours = Math.floor(minutes / 60);
    var minutes = minutes % 60;
    return hours + "h" + " " + (minutes < 10 ? "0" : "") + minutes + "m";
  }

  return (
    <div className={style.wrapp}>
      {convertMinutesToHoursAndMinutes(minutes)}
    </div>
  );
}

export default Time;