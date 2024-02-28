import style from './FirstLastAirDates.module.scss';

const FirstLastAirDates = ({release, endDate, status}) => {
  const releaseDate = release?.slice(0, 4);
  const lastDate = status && status === 'Ended' && endDate && ` - ${endDate.slice(0, 4)}`;

  const isRes = Boolean(release.length);

  return (
    <>
      {
        isRes &&
          <p className={style.wrapp}>
            { releaseDate && <span>{ releaseDate }</span> }
            { lastDate && <span>{ lastDate }</span> }
          </p>
      }
    </>
  );
};

export default FirstLastAirDates;