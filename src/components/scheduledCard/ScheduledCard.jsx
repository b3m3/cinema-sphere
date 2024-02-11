import { Link } from 'react-router-dom';
import moment from 'moment';

import style from './scheduled-card.module.scss';
import AddToWatchlist from '../addToWatchlist/AddToWatchlist';

const ScheduledCard = ({id, category, title, release_date}) => {
  return (
    <div className={style.wrapp}>
      <AddToWatchlist id={id} category={category} bookmark />

      <Link className={style.col} to={`/${category}/${id}`}>
        <p>{title}</p>
        <span>{moment(release_date).format('DD MMMM, YYYY')}</span>
      </Link>
    </div>
  );
}

export default ScheduledCard;