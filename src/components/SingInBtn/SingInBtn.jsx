import {memo} from "react";
import { Link } from "react-router-dom";

import style from './SingInBtn.module.scss';

const SingInBtn = memo(({big}) => {
  return (
    <div className={`${style.wrapp} ${big && style.big}`}>
      <Link to={'/login'}>
        { big ? 'Sign in for more access' : 'Sing In' }
      </Link>
    </div>

  );
});

export default SingInBtn;