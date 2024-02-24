import {useState, useEffect, useCallback, useMemo} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { clearSearch } from "../../../store/slices/fetchSearchBarSlice";
import { fetchSearchBar } from "../../../store/asyncThunks/fetchSearchBar";
import { useCategoryFromLocation } from "../../../hooks/useCategoryFromLocation";

import { IoFilterOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

import { IoSearch } from "react-icons/io5";

import SearchCard from "../../../components/searchCard/SearchCard";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import Filters from "./Filters/Filters";

import style from './SearchBar.module.scss';

const SearchBar = () => {
  // DropdownMenu
  const [selectedOption, setSelectedOption] = useState('All');

  // SearchInput
  const [openSearch, setOpenSearch] = useState(false);
  const [value, setValue] = useState('');

  // Filters
  const [openFilters, setOpenFilter] = useState(false);

  const { status, res } = useSelector(state => state.searchBar);
  const { lang } = useSelector(state => state.lang);

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();
  const navigate = useNavigate();

  const optionCategory = useMemo(() => {
    switch (selectedOption) {
      case 'All': return 'multi';
      case 'Movies': return 'movie';
      case 'Tv Series': return 'tv';
      case 'Celebs': return 'person';

      default: return;
    }
  }, [selectedOption]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (value) {
        const doc = { category: optionCategory, value, page: 1, lang }
        dispatch(fetchSearchBar(doc));
      }
    }, 1500);

    if (!value) {
      dispatch(clearSearch());
    }

    return () => clearTimeout(debounce);
  }, [dispatch, value, category, optionCategory, lang]);

  const optionHandler = useCallback((name) => {
    setSelectedOption(name)
    dispatch(clearSearch())
  }, [dispatch]);

  const filterHandler = () => {
    setOpenFilter(true);
  }

  const handleNavigate = useCallback(({media_type, id}) => {
    setValue('')
    navigate(`/${media_type ? media_type : optionCategory}/${id}`);
  }, [navigate, optionCategory]);

  const handleChange = useCallback((event) => {
    return setValue(event.target.value)
  }, []);

  const handleClose = () => {
    setOpenSearch(false)
    setValue('')
  }

  const SearchCardCategory = selectedOption !== 'All' && selectedOption.slice(0, -1);
  const searchClass = `${style.search} ${openSearch ? style.open_search : ''}`;
  const resultsClass = `${style.results} ${openSearch && style.results_open}`;
  
  return (
    <div className={style.wrapp}>
      <div className={searchClass}>
        <DropdownMenu selectedOption={selectedOption} optionHandler={optionHandler} />

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
                    <SearchCard {...props} category={SearchCardCategory} />
                  </li>
                )
              })}
            </ul>
        }

        {
          res?.results?.length > 0 && optionCategory !== 'multi' &&
            <Link
              className={style.see_all}
              to={`/search/${optionCategory}/${value}/1`}
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