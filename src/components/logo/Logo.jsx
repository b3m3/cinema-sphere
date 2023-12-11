import { Link } from 'react-router-dom';
import style from './logo.module.scss';

const Logo = () => {
  return (
    <Link className={style.wrapp} to="/">
      Cinema sphere
    </Link>
  );
}

export default Logo;