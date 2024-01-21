import style from './title.module.scss';

const Title = ({title, length}) => {
  return (
    <h2 className={style.wrapp}>
      {title} {length && `(${length})`}
    </h2>
  );
}

export default Title;