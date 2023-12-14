import { Link } from "react-router-dom";

import style from './sing-in-btn.module.scss';

const SingInBtn = () => {
  return (
    <Link className={style.wrapp} to={'/login'}>
      Sing In
    </Link>
  );
}

export default SingInBtn;