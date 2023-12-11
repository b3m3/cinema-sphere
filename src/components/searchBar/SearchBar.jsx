import { CiSearch } from "react-icons/ci";

import style from './searchBar.module.scss';

const SearchBar = () => {
  return (
    <div className={style.wrapp}>
      <div className={style.select}>All</div>
      <input className={style.input} type="text" placeholder="Search Cinema Sphere" />
      <button className={style.button}>
        <CiSearch />
      </button>
    </div>
  );
}

export default SearchBar;