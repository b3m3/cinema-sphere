import Title from '../title/Title';

import style from './overview.module.scss';

const Overview = ({overview}) => {
  return (
    <>
      {
        overview && 
          <div className={style.wrapp}>
            <Title title='Overview' />
            <p>
              {overview}
            </p>
          </div>
      }
    </>
  );
}

export default Overview;