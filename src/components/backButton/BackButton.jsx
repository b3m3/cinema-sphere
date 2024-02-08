import { Link } from 'react-router-dom';
import { MdOutlineArrowBackIos } from "react-icons/md";


import style from './back-button.module.scss';

const BackButton = ({path, name}) => {
  return (
    <div className={style.wrapp}>
      <Link to={path}>
        <span><MdOutlineArrowBackIos /></span>
        <p>{name}</p>
      </Link>
    </div>
  );
}

export default BackButton;