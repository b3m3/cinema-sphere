import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, memo} from "react";

import {fetchGenresList} from "../../../../../store/asyncThunks/fetchGenresList";
import Loading from "../../../../../components/loading/Loading";

import style from './GenresOptions.module.scss';


const GenresOptions = memo(({category, genres, setGenres, activeStyle}) => {
  const {loading, res} = useSelector(state => state.genresList);
  const {lang} = useSelector(state => state.lang);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenresList({category, lang}))
  }, [dispatch, category, lang]);

  const selectGenresHandler = useCallback((str, state, setState) => {
    if (state.indexOf(str) !== -1) {
      const newArr = state.filter(elem => elem !== str);

      setState([...newArr]);
    } else {
      setState(c => [...c.filter(elem => elem !== str), str]);
    }
  }, []);

  return (
    <div className={style.wrapp}>
      <h3>Genres</h3>

      { loading && <Loading size={25}/> }

      <ul>
        {res?.genres?.map(({id, name}, i) => (
          <li key={id + i}>
            <button
              onClick={() => selectGenresHandler(id, genres, setGenres)}
              style={genres?.indexOf(id) !== -1 ? activeStyle : null}
            >
              { name }
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default GenresOptions;