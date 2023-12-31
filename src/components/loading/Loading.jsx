import Pulse from './pulse.svg';
import PulseBlack from './pulse_black.svg';
import Spinner from './spinner.svg';

import style from './loading.module.scss';

const Loading = ({spinner, size, black}) => {
  return (
    <div className={style.wrapp}>
      <img src={spinner ? Spinner : black ? PulseBlack : Pulse} alt="Loading" style={{width: `${size}%`, height: `${size}%`}} />
    </div>
  );
}

export default Loading;