import Pulse from './pulse.svg';

import style from './loading.module.scss';

const Loading = () => {
  return (
    <div className={style.wrapp}>
      <img src={Pulse} alt="Loading" />
    </div>
  );
}

export default Loading;