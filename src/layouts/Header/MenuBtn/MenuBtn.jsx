import {memo} from "react";
import { IoMenu } from "react-icons/io5";
import style from './MenuBtn.module.scss';

const MenuBtn = memo(({handleOpenNavbar}) => {
  return (
    <button className={style.button} onClick={handleOpenNavbar} >
      <IoMenu />
    </button>
  );
})

export default MenuBtn;