import PosterImage from '../posterImage/PosterImage';

import style from './celeb-card.module.scss';

const CelebCard = ({id, original_name, character, profile_path}) => {
  return (
    <div className={style.wrapp}>
      <div className={style.image}>
        <PosterImage id={id} poster_path={profile_path} title={original_name} link category={'person'} />
      </div>

      <div className={style.box}>
        <h4>{original_name && original_name}</h4>
        <p>{character && character}</p>
      </div>
    </div>
  );
}

export default CelebCard;