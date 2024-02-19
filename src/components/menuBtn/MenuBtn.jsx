import { IoMenu } from "react-icons/io5";
import style from './menu-btn.module.scss';

const MenuBtn = ({handleOpenNavbar}) => {
  return (
    <button className={style.button} onClick={handleOpenNavbar} >
      <IoMenu />
    </button>
  );
}

export default MenuBtn;