import {memo, useCallback, useMemo} from "react";
import {Link} from "react-router-dom";

import {CgMenuGridR} from "react-icons/cg";
import {IoIosCloseCircleOutline} from "react-icons/io";

import style from './TopGallery.module.scss';

const TopGallery = memo((props) => {
  const {isModalImages, isModalVideos, imageResults, videoResults, category, id, season, episode, bodyRef, count} = props;

  const scrollToBody = useCallback(() => {
    return bodyRef.current.scrollIntoView();
  }, [bodyRef]);

  const closePath = useMemo(() => {
    return `/${category}/${id}${season ? `/seasons/${season}` : ''}${episode ? `/episodes/${episode}`: ''}`;
  }, [category, id, season, episode]);

  return (
    <div className={style.wrapp}>
      <div className={style.counter}>
        <span>{count}</span>
        <span>of</span>
        <span>
          {isModalImages && imageResults?.length}
          {isModalVideos && videoResults?.length}
        </span>
      </div>
      <CgMenuGridR className={style.scroll} onClick={scrollToBody}/>

      <Link className={style.close} to={closePath}>
        <IoIosCloseCircleOutline/>
      </Link>
    </div>
  );
});

export default TopGallery;