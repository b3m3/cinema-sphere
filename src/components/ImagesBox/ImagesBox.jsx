import {memo, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { FaRegImage } from "react-icons/fa6";
import {fetchImages} from "../../store/asyncThunks/fetchImages";

import style from './ImagesBox.module.scss';

const ImagesBox = memo(({id, season, episode, category}) => {
  const images = useSelector(state => state.images);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (season && !episode) {
      dispatch(fetchImages({category, season, id}));
    } else if (season && episode) {
      dispatch(fetchImages({category, episode, season, id}));
    } else {
      dispatch(fetchImages({category, id}));
    }
  }, [dispatch, category, episode, season, id]);

  const {backdrops, profiles, posters, stills} = {...images?.res};

  const res = useMemo(() => {
    return backdrops || profiles || posters || stills
  }, [backdrops, profiles, posters, stills]);

  const isResLength = useMemo(() => Boolean(res?.length), [res]);

  const path = isResLength ? `${pathname}/gallery/images` : '';
  const count = isResLength && res?.length > 1 ? res?.length + ' PHOTOS' : res?.length + ' PHOTO';

  return (
    <Link className={style.wrapp} to={path} >
      <FaRegImage />
      <span>{ count } </span>
    </Link>
  );
});

export default ImagesBox;