import { Link } from 'react-router-dom';
import style from './Genres.module.scss';

const Genres = ({genres, category}) => {
  return (
    <ul className={style.wrapp}>
      {genres?.map(({id, name}) => (
        <li key={id}>
          <Link to={`/discover/${category}/&include_adult=false&with_genres=${id}&/1`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Genres;