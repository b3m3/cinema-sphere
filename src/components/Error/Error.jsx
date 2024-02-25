import {memo} from "react";
import style from './Error.module.scss';

const Error = memo(({status}) => {
  return (
    <div className={style.wrapp}>
      <h2>{status}</h2>
    </div>
  );
})

export default Error;