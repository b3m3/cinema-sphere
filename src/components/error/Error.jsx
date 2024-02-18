import style from './error.module.scss';

const Error = ({status}) => {
  return (
    <div className={style.wrapp}>
      <h2>{status}</h2>
    </div>
  );
}

export default Error;