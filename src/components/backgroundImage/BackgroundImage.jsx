import { useMemo } from 'react';
import { IMAGE_URL } from '../../constants/api';

import style from './background-image.module.scss';

const BackgroundImage = ({backdrop_path}) => {
  const imgSrc =  useMemo(() => {
    return backdrop_path && `${IMAGE_URL}/w1280/${backdrop_path}`
  }, [backdrop_path])

  return (
    <img src={imgSrc} alt={" "} className={style.image} />
  );
}

export default BackgroundImage;