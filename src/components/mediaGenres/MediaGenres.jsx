import style from './media-genres.module.scss';

const MediaGenres = ({genres}) => {
  return (
    <ul className={style.wrapp}>
      {genres?.map(({id, name}) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
}

export default MediaGenres;