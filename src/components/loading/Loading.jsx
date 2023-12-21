import Pulse from './pulse.svg';
import Spinner from './spinner.svg';

import style from './loading.module.scss';

const Loading = ({spinner, size}) => {
  return (
    <div className={style.wrapp}>
      <img src={spinner ? Spinner : Pulse} alt="Loading" style={{width: `${size}%`, height: `${size}%`}} />
    </div>
  );
}

export default Loading;