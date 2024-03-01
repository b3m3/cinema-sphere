import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrending } from "../../store/asyncThunks/fetchTrending";
import Loading from '../Loading/Loading';
import List from "./List/List";
import Swiper from "./Swiper/Swiper";

import style from './SideTrending.module.scss';

const breakpoints = {
  1024: { slidesPerView: 2, slidesPerGroup: 2 }
}

const SideTrending = ({category, lang, list}) => {
  const { loading, res } = useSelector(state => state.trending);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrending({category: `${category ? category : 'all'}`, lang}))
  }, [dispatch, lang, category]);

  return (
    <>
      { loading && <Loading size={30} black /> }

      {
        res &&        
          <div className={style.wrapp}>
          <h2>Trending</h2>
          {
            list
              ? <List results={res?.results} category={category} />
              : <Swiper results={res?.results} category={category} breakpoints={breakpoints} />
          }
        </div>
      }
    </>
  );
}

export default SideTrending;