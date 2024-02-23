import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { autoCloser } from "../../utils/functions";
import { clearSearch } from "../../store/slices/fetchSearchBarSlice";
import { fetchSearchBar } from "../../store/asyncThunks/fetchSearchBar";
import { useCategoryFromLocation } from "../../hooks/useCategoryFromLocation";

import { IoFilterOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

import { IoSearch } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";

import SearchCard from "../searchCard/SearchCard";
import Loading from "../loading/Loading";
import Error from "../error/Error";

import style from './searchBar.module.scss';
import Filters from "../filters/Filters";

const selectArr = [
  {name: 'All', category: 'multi'},
  {name: 'Movies', category: 'movie'},
  {name: 'Tv Series', category: 'tv'},
  {name: 'Celebs', category: 'person'},
]

const SearchBar = ({lang}) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [openFilters, setOpenFilter] = useState(false);
  const [selected, setSelected] = useState(0);
  const [value, setValue] = useState('');

  const { status, res } = useSelector(state => state.searchBar);
  const category = useCategoryFromLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    autoCloser('HEADER', openSelect, setOpenSelect);
  }, [openSelect]);

  const selectedName = useMemo(() => {
    return selectArr[selected].name
  }, [selected]);

  const selectedCategory = useMemo(() => {
    return selectArr[selected].category
  }, [selected]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (value) {
        const doc = { category: selectArr[selected].category, value, page: 1, lang }
        dispatch(fetchSearchBar(doc));
      }
    }, 1500);

    if (!value) {
      dispatch(clearSearch());
    }

    return () => clearTimeout(debounce);
  }, [dispatch, value, category, selected, lang]);

  const filterHandler = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleNavigate = useCallback(({media_type, id}) => {
    setValue('')
    navigate(`/${media_type ? media_type : selectArr[selected].category}/${id}`);
  }, [navigate, selected]);

  const handleChange = useCallback((event) => {
    return setValue(event.target.value)
  }, []);

  const handleCategory = useCallback((index) => {
    setSelected(index) 
    dispatch(clearSearch())
  }, [dispatch]);

  const handleOpenSelect = useCallback(() => {
    setOpenSelect(c => !c)
  }, [])

  const handleClose = useCallback(() => {
    setOpenSearch(false)
    setValue('')
  }, []);

  const newCategory = selectedName !== 'All' && selectedName.slice(0, -1);

  const searchClass = useMemo(() => {
    return `${style.search} ${openSearch ? style.open_search : ''}`
  }, [openSearch]);

  const resultsClass = useMemo(() => {
    return `${style.results} ${openSearch && style.results_open}`
  }, [openSearch]);
  
  return (
    <div className={style.wrapp}>
      <div className={searchClass}>
        <div className={style.select} onClick={handleOpenSelect}>
          <span>{selectedName}</span>
          <MdOutlineArrowDropDown />

          <ul className={openSelect ? style.open_select : ''}>
            {selectArr.map(({name, category}, i) => (
              <li 
                key={category}
                style={selected === i ? {color: 'var(--orange-400'} : null}
                onClick={() => handleCategory(i)}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className={style.input_wrapp}>
          <input 
            type="text" 
            placeholder="Search Cinema Sphere" 
            onChange={handleChange}
            value={value}
          />
          <button className={style.close} onClick={handleClose}>
            <IoIosClose />
          </button>
        </div>

        <button className={style.filter_button} onClick={filterHandler}>
          <IoFilterOutline />
        </button>
      </div>

      <button className={style.search_button} onClick={() => setOpenSearch(true)}>
        <IoSearch />
      </button>

      <div className={resultsClass}>
        { value && !res && <Loading />}
        { status && <Error status={status} /> }
        {
          value && res &&
            <ul>
              {res?.results?.map((props) => {
                return (
                  <li 
                    key={props.id} 
                    onClick={() => handleNavigate({id: props.id, media_type: props.media_type})} 
                  >
                    <SearchCard {...props} category={newCategory} />
                  </li>
                )
              })}
            </ul>
        }

        {
          res?.results?.length > 0 && selectedCategory !== 'multi' &&
            <Link
              className={style.see_all}
              to={`/search/${selectedCategory}/${value}/1`} 
              onClick={() => setValue('')}
            >
              See all results →
            </Link>
        }

        {
          res?.results?.length === 0 &&
            <div className={style.no_res}>
              No results found for "{value}"
            </div>
        }
      </div>

      { openFilters && <Filters setOpenFilter={setOpenFilter} /> }
    </div>
  );
}

export default SearchBar;