import style from './LatestMovies.module.scss';
import Loading from "../../../components/Loading/Loading";
import LatestCard from "./LatestCard/LatestCard";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {fetchDiscover} from "../../../store/asyncThunks/fetchDiscover";

const LatestMovies = () => {
  const { res, loading } = useSelector(state => state.discover);
  const { lang } = useSelector(state => state.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    const doc = {
      category: 'movie',
      filters: '&vote_count.gte=5&include_adult=false&sort_by=primary_release_date.desc',
      page: 1,
      lang
    }
    dispatch(fetchDiscover(doc))
  }, [dispatch, lang]);

  const itemNumber = useCallback((index) => {
    return index + 1
  }, []);

  return (
    <div className={style.wrapp}>
      <h2>Latest movies</h2>

      { loading && <Loading size={7}/> }

      <ul>
        {res?.results?.slice(0, 8).map(({id, title, release_date}, i) => (
          <li key={id}>
            <span>{itemNumber(i)}</span>
            <LatestCard category={'movie'} id={id} title={title} releaseDate={release_date} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestMovies;