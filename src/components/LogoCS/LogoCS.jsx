import { Link } from 'react-router-dom';

import style from './LogoCS.module.scss';

const LogoCS = ({ onClick }) => {
  return (
    <div className={style.wrapp}>
      <Link className={style.logo} to="/" onClick={onClick}>Cinema sphere</Link>
    </div>
  );
}

export default LogoCS;