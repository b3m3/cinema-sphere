import PosterImage from '../posterImage/PosterImage';

import style from './search-card.module.scss';

const SearchCard = ({id, title, name, release_date, first_air_date, known_for_department, profile_path, poster_path}) => {
  const getYear = (str) => str.split('-').shift();

  return (
    <div className={style.wrapp}>
      <PosterImage poster_path={poster_path || profile_path} title={"Poster"} id={id} />
      
      <div className={style.box}>
        <h4>{ name ? name : title ? title : null}</h4>
        <p>
          {known_for_department && known_for_department}
          {release_date ? getYear(release_date) : first_air_date ? getYear(first_air_date) : null}
        </p>
      </div>
    </div>
  );
}

export default SearchCard;