import {memo, useCallback, useMemo, useState} from 'react';
import { Link } from 'react-router-dom';

import { IMAGE_URL } from '../../constants/api';
import Mask from '../../assets/images/PosterMask.webp'

import style from './PosterImage.module.scss';

const PosterImage = memo((props) => {
  const {id, posterPath, title, link, media_type, category, season, episode} = props;
  
  const [load, setLoad] = useState(true);

  const className = useMemo(() => {
    return `${style.poster} ${link ? style.link : ''}`;
  }, [link]);

  const imgSrc = useMemo(() => {
    return  posterPath ? `${IMAGE_URL}w500/${posterPath}` : Mask;
  }, [posterPath]);

  const path = useMemo(() => {
    const getCategory = media_type ? media_type : category;
    const getSeason = season ? `/seasons/${season}` : '';
    const getEpisode = episode ? `/episodes/${episode}` : '';

    return link ? `/${getCategory}/${id}${getSeason}${getEpisode}` : '';
  }, [link, media_type, category, id, season, episode]);

  const onLoad = useCallback(() => {
    return setLoad(false);
  }, []);

  return (
    <Link className={className} to={path}>
      { load && <span/> }
      <img src={imgSrc} alt={title} onLoad={onLoad}/>
    </Link>
  );
});

export default PosterImage;