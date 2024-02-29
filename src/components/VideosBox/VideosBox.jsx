import {useDispatch, useSelector} from "react-redux";
import {memo, useEffect, useMemo} from "react";

import { Link, useLocation } from "react-router-dom";
import { FaPhotoVideo } from "react-icons/fa";
import {fetchVideos} from "../../store/asyncThunks/fetchVideos";

import style from './VideosBox.module.scss';

const VideosBox = memo(({id, category, lang}) => {
  const videos = useSelector(state => state.videos);

  const {pathname} = useLocation();
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(fetchVideos({category, lang, id}));
  }, [dispatch, category, lang, id]);

  const resLength = useMemo(() => videos.res?.results?.length, [videos]);

  const path = Boolean(resLength) ? `${pathname}/gallery/videos` : '';
  const count = resLength > 1 ? resLength + ' VIDEOS' : resLength + ' VIDEO';

  return (
    <Link className={style.wrapp} to={path}>
      <FaPhotoVideo />
      <span>{ count }</span>
    </Link>
  );
})

export default VideosBox;