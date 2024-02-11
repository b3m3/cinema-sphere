import { Link } from 'react-router-dom';

import style from './logo.module.scss';

const Logo = ({onClick}) => {
  return (
    <Link className={style.wrapp} to="/" onClick={onClick}>
      <span>Cinema sphere</span>
    </Link>
  );
}

export default Logo;