import {memo} from "react";
import style from './SortOptions.module.scss';

const sortArr = [
  {name: 'Popular', path: 'Popularity.desc'},
  {name: 'Date', path: 'primary_release_date.desc'},
  {name: 'Rating', path: 'vote_average.desc'},
  {name: 'Votes', path: 'vote_count.desc'},
];

const SortOptions = memo(({sort, setSort, activeStyle}) => {
  return (
    <div className={style.wrapp}>
      <h3>Sort by</h3>

      <ul>
        {sortArr.map(({name, path}) => (
          <li key={path}>
            <button
              onClick={() => setSort(path)}
              style={sort.indexOf(path) !== -1 ? activeStyle : null}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SortOptions;