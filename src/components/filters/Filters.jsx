import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchGenresList } from '../../store/slices/fetchDataSlice';

import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown  } from "react-icons/md";

import style from './filters.module.scss';
import Loading from "../loading/Loading";

const sortArr = [
  {name: 'Popular', path: 'popularity.desc'},
  {name: 'Date', path: 'primary_release_date.desc'},
  {name: 'Rating', path: 'vote_average.desc'},
  {name: 'Votes', path: 'vote_count.desc'},
];

const categoryArr = [
  {name: 'Movies', path: 'movie'},
  {name: 'Tv series', path: 'tv'}
];

const currentYear = new Date().getFullYear();

const Filters = ({setOpenFilter}) => {
  const [category, setCategory] = useState('movie');
  const [sort, setSort] = useState('popularity.desc');
  const [genres, setGenres] = useState([]);
  const [ratingMin, setRatingMin] = useState(1);
  const [ratingMax, setRatingMax] = useState(10);
  const [dateMin, setDateMin] = useState(1970);
  const [dateMax, setDateMax] = useState(currentYear);

  const { lang } = useSelector(state => state.lang);
  const {genresList} = useSelector(state => state.genresList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenresList({category, lang}))
  }, [dispatch, category, lang]);

  const handleClose = () => {
    setOpenFilter(false);
  };

  const selectHandler = useCallback((str, state, setState) => {
    if (state.indexOf(str) !== -1) {
      const newArr = state.filter(elem => elem !== str);

      setState([...newArr]);
    } else {
      setState(c => [...c.filter(elem => elem !== str), str]);
    }
  }, []);

  // onChange

  const getMinValue = useCallback((event, minValue, state, valeLength) => {
    const value = +event.target.value;

    if (valeLength) {
      return value.toString().length >= valeLength && value < minValue ? minValue : value > state ? state : value
    }

    return value < minValue ? minValue : value > state ? state : value
  }, []);

  const getMaxValue = useCallback((event, maxValue, state, valeLength) => {
    const value = +event.target.value;
    
    if (valeLength) {
      return value.toString().length >= valeLength && value <= state ? state : value > maxValue ? maxValue : value
    }

    return value <= state ? state : value > maxValue ? maxValue : value
  }, []);

  // onClick

  const incMin = useCallback((state, setState) => {
    return setState(c => c < state ? c +1 : c);
  }, []);

  const decMin = useCallback((setState, minValue) => {
    return setState(c => c <= minValue ? minValue : c -1);
  }, []);

  const incMax = useCallback((setState, maxValue) => {
    return setState(c => c < maxValue ? c +1 : c);
  }, []);

  const decMax = useCallback((state, setState) => {
    return setState(c => c > state ? c -1 : c);
  }, []);
  
  const link = useMemo(() => {
    return `discover/${category}/&include_adult=false&sort_by=${sort}&with_genres=${genres.join(',')}&vote_average.gte=${ratingMin}&vote_average.lte=${ratingMax}&primary_release_date.gte=${dateMin}&primary_release_date.lte=${dateMax}&language=${lang}`;
  }, [category, sort, genres, ratingMin, ratingMax, dateMin, dateMax, lang]);
  
  const activeStyleSortBtn = { border: '1px solid var(--orange-400)', background: 'var(--orange-400)', color: 'var(--black)' };

  return (
    <div className={style.wrapp}>
      
      <div className={style.body}>
        <div className={style.top}>

          <div className={style.row}>
            <h3>Category</h3>

            <ul>
              {categoryArr.map(({path, name}) => (
                <li key={path}>
                  <button
                    onClick={() => setCategory(path)}
                    style={category.indexOf(path) !== -1 ? activeStyleSortBtn : null}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={style.row}>
            <h3>Sort by</h3>

            <ul>
              {sortArr.map(({name, path}) => (
                <li key={path}>
                  <button
                    onClick={() => setSort(path)}
                    style={sort.indexOf(path) !== -1 ? activeStyleSortBtn : null}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={style.row}>
            <h3>Genres</h3>

            {genresList?.loading && <Loading size={25} />}

            <ul>
              {genresList.res?.genres?.map(({id, name}) => (
                <li key={id}>
                  <button 
                    onClick={() => selectHandler(id, genres, setGenres)}
                    style={genres?.indexOf(id) !== -1 ? activeStyleSortBtn : null}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={style.row}>
            <h3>Rating</h3>

            <ul>
              <li className={style.input_wrapp}>
                <input 
                  type="number"
                  name="rating-min" 
                  value={ratingMin}
                  onChange={(e) => setRatingMin(getMinValue(e, 1, ratingMax))}
                  onFocus={e => e.target.select()}
                />
                <div>
                  <button onClick={() => incMin(ratingMax, setRatingMin)}>
                    <MdOutlineKeyboardArrowUp/>
                  </button>
                  <button onClick={() => decMin(setRatingMin, 1)}>
                    <MdOutlineKeyboardArrowDown/>
                  </button>
                </div>
              </li>

              <li className={style.input_wrapp}>
                <input 
                  type="number"
                  name="rating-max" 
                  value={ratingMax}
                  onChange={(e) => setRatingMax(getMaxValue(e, 10, ratingMin))}
                  onFocus={e => e.target.select()}
                />
                <div>
                  <button onClick={() => incMax(setRatingMax, 10)}>
                    <MdOutlineKeyboardArrowUp/>
                  </button>
                  <button onClick={() => decMax(ratingMin, setRatingMax)}>
                    <MdOutlineKeyboardArrowDown/>
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <div className={style.row}>
            <h3>Date</h3>

            <ul>
              <li className={style.input_wrapp}>
                <input 
                  type="number"
                  name="date-min" 
                  value={dateMin}
                  onChange={(e) => setDateMin(getMinValue(e, 1970, dateMax, 4))}
                  onFocus={(e) =>  e.target.select()}
                />
                <div>
                  <button onClick={() => incMin(dateMax, setDateMin)}>
                    <MdOutlineKeyboardArrowUp/>
                  </button>
                  <button onClick={() => decMin(setDateMin, 1970)}>
                    <MdOutlineKeyboardArrowDown/>
                  </button>
                </div>
              </li>

              <li className={style.input_wrapp}>
                <input 
                  type="number"
                  name="date-max" 
                  value={dateMax}
                  onChange={(e) => setDateMax(getMaxValue(e, currentYear, dateMin, 4))}
                  onFocus={(e) => e.target.select()}
                />
                <div>
                  <button onClick={() => incMax(setDateMax, currentYear)}>
                    <MdOutlineKeyboardArrowUp/>
                  </button>
                  <button onClick={() => decMax(dateMin, setDateMax)}>
                    <MdOutlineKeyboardArrowDown/>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className={style.bottom}>
          <button onClick={handleClose}>Close</button>
          <button>Acept</button>
        </div>

        <button className={style.close} onClick={handleClose}>
          <IoClose />
        </button>
      </div>
    </div>
  );
}

export default Filters;