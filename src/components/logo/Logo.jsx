import { Link } from 'react-router-dom';

import Brush from './pngegg.png'

import style from './logo.module.scss';

const Logo = ({onClick}) => {
  return (
    <Link className={style.wrapp} to="/" onClick={onClick}>
      <span>Cinema sphere</span>
      <img src={Brush} alt={" "} />
    </Link>
  );
}

export default Logo;