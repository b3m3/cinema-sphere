import {memo} from "react";
import { Link } from 'react-router-dom';
import moment from 'moment';

import WatchlistButton from '../../../../components/WatchlistButton/WatchlistButton';

import style from './LatestCard.module.scss';

const LatestCard = memo(({id, category, title, releaseDate}) => {
  return (
    <div className={style.wrapp}>
      <div className={style.bookmark}>
        <WatchlistButton id={id} category={category} bookmark />
      </div>

      <Link className={style.col} to={`/${category}/${id}`}>
        <p>{title}</p>
        <span>{moment(releaseDate).format('DD MMMM, YYYY')}</span>
      </Link>
    </div>
  );
});

export default LatestCard;