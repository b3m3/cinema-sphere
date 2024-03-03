import {memo, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';

import {fetchDetails} from "../../store/asyncThunks/fetchDetails";

import style from './Breadcrumbs.module.scss';

const Breadcrumbs = memo(({ id, lang, category, season, seasonName, episodeName }) => {
  const details = useSelector(state => state.details);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetails({category, lang, id}))
  }, [dispatch, category, lang, id]);

  const seriesName = useMemo(() => details.res?.name, [details]);

  return (
    <h1 className={style.title}>
      {
        seriesName && <Link to={`/${category}/${id}`}>{ seriesName }</Link>
      }
      {
        seasonName &&
          <Link to={`/${category}/${id}/seasons/${season}`}>
            { seasonName === 'Season 0' ? 'Special' : seasonName }
          </Link>
      }
      {
        episodeName && <Link to={null}>{ episodeName }</Link>
      }
    </h1>
  );
})

export default Breadcrumbs;