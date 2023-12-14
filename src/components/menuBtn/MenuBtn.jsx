import { useDispatch } from "react-redux";

import { isOpenMenu } from "../../store/slices/menuSlice";

import { IoMenu } from "react-icons/io5";

import style from './menu-btn.module.scss';

const MenuBtn = () => {
  const dispatch = useDispatch();

  return (
    <button 
      className={style.button}
      onClick={() => dispatch(isOpenMenu())}
    >
      <IoMenu />
    </button>
  );
}

export default MenuBtn;