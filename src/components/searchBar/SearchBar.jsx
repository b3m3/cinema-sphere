import { useState, useEffect } from "react";

import { autoCloser } from "../../utils/functions";

import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";

import style from './searchBar.module.scss';

const selectArr = ['All', 'Movies', 'Tv Series', 'Celebs']

const SearchBar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    autoCloser('HEADER', openSelect, setOpenSelect);
  }, [openSelect]);

  return (
    <div className={style.wrapp}>
      <div className={`${style.search} ${openSearch && style.open_search}`}>
        <div className={style.select} onClick={() => setOpenSelect(c => !c)}>
          <span>{selectArr[selected]}</span>
          <MdOutlineArrowDropDown />

          <ul className={openSelect && style.open_select}>
            {selectArr.map((elem, i) => (
              <li 
                key={elem} 
                style={selected === i ? {color: 'var(--orange-400'} : null}
                onClick={() => setSelected(i)}
              >
                {elem}
              </li>
            ))}
          </ul>
        </div>
        <input className={style.input} type="text" placeholder="Search Cinema Sphere" />
        <button className={style.close} onClick={() => setOpenSearch(false)}>
          <IoIosCloseCircleOutline />
        </button>
      </div>
      <button className={style.button} onClick={() => setOpenSearch(true)}>
        <IoSearch />
      </button>
    </div>
  );
}

export default SearchBar;