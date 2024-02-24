import {memo} from "react";
import {IoIosClose} from "react-icons/io";

import style from "./Input.module.scss";

const Input = memo(({value, onChangeHandler, handleClearInput}) => {
  return (
    <div className={style.wrapp}>
      <input
        type="text"
        placeholder="Search Cinema Sphere"
        onChange={onChangeHandler}
        value={value}
      />

      <button className={style.close} onClick={handleClearInput}>
        <IoIosClose/>
      </button>
    </div>
  );
});

export default Input;