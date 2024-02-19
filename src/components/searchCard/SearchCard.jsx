import { useMemo } from 'react';
import moment from 'moment';
import PosterImage from '../posterImage/PosterImage';
import Rating from '../rating/Rating';

import style from './search-card.module.scss';

const SearchCard = (props) => {
  const {id, link, title, name, release_date, media_type, genresList, genre_ids, vote_average, 
    first_air_date, profile_path, poster_path, known_for_department, category} = props;

  const categoryFullName = useMemo(() => {
    return media_type === 'tv' ? 'Tv serie' : media_type === 'movie' ? 'Movie' : category;
  }, [media_type, category]);

  const date = useMemo(() => {
    return (release_date || first_air_date) && `${moment((release_date || first_air_date)).format('YYYY')}`
  }, [release_date, first_air_date]);

  const titleName = useMemo(() => {
    return name ? name : title ? title : null;
  }, [name, title]);

  const posterProps = useMemo(() => {
    return {poster_path: poster_path || profile_path, title: "Poster", id, link, category, media_type}
  }, [poster_path, profile_path, id, link, category, media_type]);

  const rating = useMemo(() => {
    return vote_average ? vote_average.toString().slice(0, 3) : null
  }, [vote_average])

  const genre = useMemo(() => {
    const current = genre_ids?.[0];
    return genresList ? genresList.filter(({id}) => id === current)[0]?.name : null;
  }, [genresList, genre_ids]);

  return (
    <div className={style.wrapp}>
      <PosterImage {...posterProps} />
      
      <div className={style.box}>
        <div className={style.box__top}>
          <h4>{titleName}</h4>
          <Rating rating={rating} /> 
        </div>

        <div className={style.box__row}>
          { categoryFullName && <span>{categoryFullName}</span> }
          { known_for_department && <span>{known_for_department}</span> }
          { genre && <span>{genre}</span> }
          { date && <span>{date}</span> }
        </div>
      </div>
    </div>
  );
}

export default SearchCard;