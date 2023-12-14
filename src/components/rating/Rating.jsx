import { FaStar } from "react-icons/fa6";

import style from './rating.module.scss';

const Rating = ({rating, vote_count}) => {
  return (
    <div className={style.wrapp}>
      <FaStar style={vote_count && {fontSize: '1.875rem'}}/>

      {
        vote_count
          ?
            <ul>
              <li style={{color: 'var(--white)'}}>
                <span style={{fontWeight: '600', fontSize: '1.1875rem'}}>{rating?.toString().slice(0, 3)}</span>
                <span style={{fontSize: '.9375rem'}}> / 10</span>
              </li>
              <li>{vote_count}</li>
            </ul>
          : <span>{rating?.toString().slice(0, 3)}</span>
      }
    </div>
  );
}

export default Rating;