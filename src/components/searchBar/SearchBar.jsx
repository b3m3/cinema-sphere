import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { autoCloser } from "../../utils/functions";
import { fetchSearch, clearSearch } from "../../store/slices/fetchDataSlice";
import { useCategoryFromLocation } from "../../hooks/useCategoryFromLocation";

import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";

import SearchCard from "../searchCard/SearchCard";
import Loading from "../loading/Loading";
import Error from "../error/Error";

import style from './searchBar.module.scss';

const selectArr = [
  {name: 'All', category: 'multi'},
  {name: 'Movies', category: 'movie'},
  {name: 'Tv Series', category: 'tv'},
  {name: 'Celebs', category: 'person'},
]

const SearchBar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [selected, setSelected] = useState(0);
  const [value, setValue] = useState('');

  const {loading, status, res} = useSelector(state => state.search.search);
  const {lang} = useSelector(state => state.lang);
  const dispatch = useDispatch();

  const category = useCategoryFromLocation();

  useEffect(() => {
    autoCloser('HEADER', openSelect, setOpenSelect);
  }, [openSelect]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (value) {
        const doc = { category: selectArr[selected].category, value, page: 1, lang }
        dispatch(fetchSearch(doc));
      }
    }, 1500);

    if (!value) {
      dispatch(clearSearch());
    }

    return () => clearTimeout(debounce);
  }, [dispatch, value, category, selected, lang])
  
  return (
    <div className={style.wrapp}>
      <div className={`${style.search} ${openSearch ? style.open_search : ''}`}>
        <div className={style.select} onClick={() => setOpenSelect(c => !c)}>
          <span>{selectArr[selected].name}</span>
          <MdOutlineArrowDropDown />

          <ul className={openSelect ? style.open_select : ''}>
            {selectArr.map(({name}, i) => (
              <li 
                key={i}
                style={selected === i ? {color: 'var(--orange-400'} : null}
                onClick={() => setSelected(i)}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
        <input 
          className={style.input} 
          type="text" 
          placeholder="Search Cinema Sphere" 
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button 
          className={style.close} 
          onClick={() => {
            setOpenSearch(false)
            setValue('')
          }}
        >
          <IoIosCloseCircleOutline />
        </button>
      </div>

      <button className={style.button} onClick={() => setOpenSearch(true)}>
        <IoSearch />
      </button>

      {
        value &&
          <div className={`${style.results} ${openSearch && style.results_open}`}>
            { loading && <Loading />}
            { status && <Error status={status} /> }
            {
              res &&
                <ul>
                  {res?.results?.map((props) => (
                    <li key={props.id}>
                      <Link 
                        to={`/${props.media_type ? props.media_type : selectArr[selected].category}/${props.id}`} 
                        onClick={() => setValue('')}
                      >
                        <SearchCard {...props} />
                      </Link>
                    </li>
                  ))}

                  {
                    res?.results?.length > 0 &&
                      <li style={{padding: '.625rem', textDecoration: 'underline', color: 'var(--blue-400'}}>See all results →</li>
                  }

                  {
                    res?.results?.length === 0 && 
                      <li style={{padding: '.625rem'}}>No results found for "{value}"</li>
                  }
                </ul>
            }
          </div>
      }
    </div>
  );
}

export default SearchBar;