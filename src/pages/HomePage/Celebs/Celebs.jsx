import {useDispatch, useSelector} from "react-redux";
import {memo, useEffect} from "react";

import {fetchTrendingCelebs} from "../../../store/asyncThunks/fetchTrendingHome";
import Title from "../../../components/title/Title";
import Loading from "../../../components/loading/Loading";
import CelebCard from "../../../components/celebCard/CelebCard";

import style from './Celebs.module.scss';

const Celebs = memo(() => {
  const { lang } = useSelector(state => state.lang);
  const { res, loading } = useSelector(state => state.trendingHome.celebs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrendingCelebs({lang}))
  }, [dispatch, lang]);

  return (
    <div className={style.wrapp}>
      <Title title={'Celebs'} link={'/person/popular/1'}/>

      { loading && <Loading size={7}/> }

      <ul>
        {res?.results?.slice(0, 14).map(props => (
          <li key={props.id}>
            <CelebCard {...props} big/>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Celebs;