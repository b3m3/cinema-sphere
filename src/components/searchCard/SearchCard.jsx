import PosterImage from '../posterImage/PosterImage';

import style from './search-card.module.scss';

const SearchCard = ({id, link, title, name, release_date, media_type, first_air_date, known_for_department, profile_path, poster_path}) => {
  const getYear = (str) => str.split('-').shift();

  const mediaType = media_type === 'tv' ? 'Tv serie' : media_type === 'movie' ? 'Movie' : null;

  return (
    <div className={style.wrapp}>
      <PosterImage poster_path={poster_path || profile_path} title={"Poster"} id={id} link={link} />
      
      <div className={style.box}>
        <h4>{ name ? name : title ? title : null}</h4>
        <p>
          {known_for_department && known_for_department}
        </p>
        <p>
          <span>
            {mediaType}
          </span>
          <span>
            {release_date ? `(${getYear(release_date)})` : first_air_date ? `(${getYear(first_air_date)})` : null}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SearchCard;