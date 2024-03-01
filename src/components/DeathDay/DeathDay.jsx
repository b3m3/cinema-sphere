import style from './DeathDay.module.scss';

const DeathDay = ({deathday, birthday}) => {
  return (
    <>
      {
        deathday &&
          <p className={style.wrapp}>{ `(${birthday.slice(0, 4)} - ${deathday.slice(0, 4)})` }</p>
      }
    </>
  );
};

export default DeathDay;