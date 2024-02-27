import SearchCard from "../../SearchCard/SearchCard";
import style from './List.module.scss';

const List = ({results, category}) => {
  return (
    <ul className={style.list}>
      {results?.slice(0, 10)
        .map(({id, media_type, name, title, poster_path, profile_path, known_for_department, first_air_date, vote_average}) => {
          return (
            <li key={id}>
              <SearchCard
                id={id}
                title={name || title}
                mediaType={media_type}
                date={first_air_date}
                rating={vote_average}
                posterPath={poster_path || profile_path}
                knownFor={known_for_department}
                category={category}
              />
            </li>
          )
        })}
    </ul>
  );
};

export default List;