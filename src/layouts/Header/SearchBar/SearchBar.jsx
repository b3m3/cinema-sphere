import {useState, useEffect, useCallback, useMemo} from "react";
import { useSelector, useDispatch } from 'react-redux';

import { clearSearch } from "../../../store/slices/fetchSearchBarSlice";
import { fetchSearchBar } from "../../../store/asyncThunks/fetchSearchBar";
import { useCategoryFromLocation } from "../../../hooks/useCategoryFromLocation";

import { IoFilterOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

import DropdownMenu from "./DropdownMenu/DropdownMenu";
import Filters from "./Filters/Filters";
import Input from "./Input/Input";
import DropdownResults from "./DropdownResults/DropdownResults";

import style from './SearchBar.module.scss';

const SearchBar = () => {
  // DropdownMenu
  const [selectedOption, setSelectedOption] = useState('All');

  // SearchInput
  const [openSearch, setOpenSearch] = useState(false);
  const [value, setValue] = useState('');

  // Filters
  const [openFilters, setOpenFilter] = useState(false);

  const { lang } = useSelector(state => state.lang);

  const dispatch = useDispatch();
  const category = useCategoryFromLocation();

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

  // DropdownMenu
  const optionHandler = useCallback((name) => {
    setSelectedOption(name)
    dispatch(clearSearch())
  }, [dispatch]);

  // SearchInput
  const onChangeHandler = useCallback((event) => {
    return setValue(event.target.value)
  }, []);

  const handleClearInput = useCallback(() => {
    setOpenSearch(false)
    setValue('')
  }, [])

  const handleOpenInput = useCallback(() => {
    setOpenSearch(true);
  }, [])

  // Filters
  const handleOpenFilters = useCallback(() => {
    setOpenFilter(true);
  }, [])

  const handleCloseFilters = useCallback(() => {
    setOpenFilter(false);
  }, [])

  const searchClass = `${style.search} ${openSearch ? style.search_open : ''}`;

  return (
    <div className={style.wrapp}>
      <div className={searchClass}>
        <DropdownMenu selectedOption={selectedOption} optionHandler={optionHandler} />
        <Input value={value} onChangeHandler={onChangeHandler} handleClearInput={handleClearInput} />

        <button className={style.filter_button} onClick={handleOpenFilters}>
          <IoFilterOutline />
        </button>
      </div>

      <button className={style.search_button} onClick={handleOpenInput}>
        <IoSearch />
      </button>

      <DropdownResults
        value={value}
        setValue={setValue}
        openSearch={openSearch}
        selectedOption={selectedOption}
        optionCategory={optionCategory}
      />

      { openFilters && <Filters handleCloseFilters={handleCloseFilters} /> }
    </div>
  );
}

export default SearchBar;