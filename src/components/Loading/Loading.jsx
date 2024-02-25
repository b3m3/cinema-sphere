import {memo, useMemo} from 'react';

import Pulse from '../../assets/icons/pulse.svg';
import PulseBlack from '../../assets/icons/pulse_black.svg';
import Spinner from '../../assets/icons/spinner.svg';

import style from './Loading.module.scss';

const Loading = memo(({spinner, size, black}) => {

  const imgSrc = useMemo(() => {
    return spinner ? Spinner : black ? PulseBlack : Pulse
  }, [spinner, black]);

  const imgStyle = useMemo(() => {
    return {width: `${size}%`, height: `${size}%`}
  }, [size]);

  return (
    <div className={style.wrapp}>
      <img src={imgSrc} alt="Loading" style={imgStyle} />
    </div>
  );
})

export default Loading;