import {memo} from "react";
import { IMAGE_URL } from '../../constants/api';

import style from './BackgroundImage.module.scss';

const BackgroundImage = memo(({backdropPath}) => {
  return (
    <img
      src={backdropPath && `${IMAGE_URL}/w1280/${backdropPath}`}
      alt={" "}
      className={style.image}
    />
  );
});

export default BackgroundImage;