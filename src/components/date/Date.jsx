import style from './date.module.scss';

const Date = ({date}) => {
  return (
    <span className={style.wrapp}>
      {date.toString().slice(0, 4)}
    </span>
  );
}

export default Date;