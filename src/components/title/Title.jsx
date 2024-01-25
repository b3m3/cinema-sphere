import { Link } from 'react-router-dom';

import { MdKeyboardArrowRight } from "react-icons/md";

import style from './title.module.scss';

const Title = ({title, link}) => {
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
}

export default Title;