import { IMAGE_URL } from '../../constants/api';

import style from './background-image.module.scss';

const BackgroundImage = ({backdrop_path}) => {
  return (
    <img 
      src={backdrop_path && `${IMAGE_URL}/w1280/${backdrop_path}`} 
      alt={" "}
      className={style.image}
    />
  );
}

export default BackgroundImage;