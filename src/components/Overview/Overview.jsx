import {memo, useMemo} from "react";
import Title from '../Title/Title';

import style from './Overview.module.scss';

const Overview = memo(({overview, biography}) => {
  const title = useMemo(() => {
    return (overview || biography) && ('Overview' || 'Biography')
  }, [overview, biography]);

  const text = useMemo(() => {
    return (overview || biography) && (overview || biography)
  }, [overview, biography]);

  return (
    <div className={style.wrapp}>
      <Title title={title}/>
      <p>{ text }</p>
    </div>
  );
})

export default Overview;