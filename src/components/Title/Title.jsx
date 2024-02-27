import { Link } from 'react-router-dom';
import {memo} from "react";

import { MdKeyboardArrowRight } from "react-icons/md";

import style from './Title.module.scss';

const Title = memo(({title, link}) => {
  return (
    <h2 className={style.wrapp}>
      {
        link
          ? <Link to={link}>
              {title}
              <MdKeyboardArrowRight />
            </Link>
          : <span>{title}</span>
      }
    </h2>
  );
})

export default Title;