import {memo, useCallback} from "react";

import {isOpenMenu} from "../../../store/slices/menuSlice";
import { IoMenu } from "react-icons/io5";

import style from './MenuBtn.module.scss';

const MenuBtn = memo(({dispatch}) => {
  const handleOpenNavbar = useCallback(() => {
    return dispatch(isOpenMenu());
  }, [dispatch]);

  return (
    <button className={style.button} onClick={handleOpenNavbar} >
      <IoMenu />
    </button>
  );
})

export default MenuBtn;