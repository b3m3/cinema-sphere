import Pulse from './pulse.svg';
import Spinner from './spinner.svg';

import style from './loading.module.scss';

const Loading = ({spinner}) => {
  return (
    <div className={style.wrapp}>
      <img src={spinner ? Spinner : Pulse} alt="Loading" />
    </div>
  );
}

export default Loading;