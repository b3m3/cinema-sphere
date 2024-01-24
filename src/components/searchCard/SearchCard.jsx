import { useMemo } from 'react';
import moment from 'moment';
import PosterImage from '../posterImage/PosterImage';

import style from './search-card.module.scss';

const SearchCard = (
  {id, link, title, name, release_date, media_type, first_air_date, known_for_department, profile_path, poster_path, category}
) => {

  const categoryFullName = useMemo(() => {
    return media_type === 'tv' ? 'Tv serie' : media_type === 'movie' ? 'Movie' : null;
  }, [media_type]);

  return (
    <div className={style.wrapp}>
      <PosterImage poster_path={poster_path || profile_path} title={"Poster"} id={id} link={link} category={category} media_type={media_type} />
      
      <div className={style.box}>
        <h4>{ name ? name : title ? title : null}</h4>
        <p>
          {known_for_department && known_for_department}
        </p>
        <p>
          <span>
            {categoryFullName ? categoryFullName : category}
          </span>
          <span>
            {
              release_date ? `(${moment(release_date).format('YYYY')})` :
              first_air_date ? `(${moment(first_air_date).format('YYYY')})` : null
            }
          </span>
        </p>
      </div>
    </div>
  );
}

export default SearchCard;