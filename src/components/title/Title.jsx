import style from './title.module.scss';

const Title = ({title}) => {
  return (
    <h2 className={style.wrapp}>
      {title}
    </h2>
  );
}

export default Title;