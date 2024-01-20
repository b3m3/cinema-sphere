import Title from '../title/Title';

import style from './overview.module.scss';

const Overview = ({overview, biography}) => {
  return (
    <>
      {
        overview && 
          <div className={style.wrapp}>
            <Title title={'Overview'} />
            <p>
              {overview}
            </p>
          </div>
      }
      {
        biography &&
          <div className={style.wrapp}>
            <Title title={'Biography'} />
            <p>
              {biography}
            </p>
          </div>
      }
    </>
  );
}

export default Overview;