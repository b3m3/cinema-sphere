import {memo} from "react";
import style from "./CategoryOptions.module.scss";

const categoryArr = [
  {name: 'Movies', path: 'movie'},
  {name: 'Tv series', path: 'tv'}
];

const CategoryOptions = memo(({category, setCategory, setGenres, activeStyle}) => {
  const handleClick = (path) => {
    setCategory(path);
    setGenres([]);
  };

  return (
    <div className={style.wrapp}>
      <h3>Category</h3>

      <ul>
        {categoryArr.map(({path, name}, i) => (
          <li key={path + i}>
            <button
              onClick={() => handleClick(path)}
              style={category.indexOf(path) !== -1 ? activeStyle : null}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default CategoryOptions;