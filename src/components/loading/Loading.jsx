import { useMemo } from 'react';

import Pulse from './pulse.svg';
import PulseBlack from './pulse_black.svg';
import Spinner from './spinner.svg';

import style from './loading.module.scss';

const Loading = ({spinner, size, black}) => {

  const imgSrc = useMemo(() => {
    return spinner ? Spinner : black ? PulseBlack : Pulse
  }, [spinner, black])

  const imgStyle = useMemo(() => {
    return {width: `${size}%`, height: `${size}%`}
  }, [size])

  return (
    <div className={style.wrapp}>
      <img src={imgSrc} alt="Loading" style={imgStyle} />
    </div>
  );
}

export default Loading;