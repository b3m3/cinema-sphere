import style from './error.module.scss';

const Error = ({status}) => {
  return (
    <div className={style.wrapp}>
      <h2>Oops... {status}</h2>
    </div>
  );
}

export default Error;