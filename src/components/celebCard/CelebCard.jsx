import { useMemo } from 'react';

import PosterImage from '../posterImage/PosterImage';

import style from './celeb-card.module.scss';

const CelebCard = ({id, original_name, character, profile_path, known_for_department, big}) => {

  const posterProps = useMemo(() => {
    return {id, poster_path: profile_path, title: original_name, category: 'person'}
  }, [id, profile_path,original_name])

  return (
    <div className={`${style.wrapp} ${big && style.big}`}>
      <div className={style.image}>
        <PosterImage {...posterProps} link big />
      </div>

      <div className={style.box}>
        <h4>{original_name && original_name}</h4>
        {
          !big &&
            <>          
              <p>{character && character}</p>
              <p>{known_for_department && known_for_department}</p>
            </>
        }
      </div>
    </div>
  );
}

export default CelebCard;