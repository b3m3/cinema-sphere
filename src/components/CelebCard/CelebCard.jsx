import { useMemo } from 'react';
import PosterImage from '../PosterImage/PosterImage';

import style from './CelebCard.module.scss';

const CelebCard = ({id, name, character, posterPath, knownFor, big}) => {

  const posterProps = useMemo(() => {
    return {id, posterPath: posterPath, title: name, category: 'person'}
  }, [id, posterPath, name])

  return (
    <div className={`${style.wrapp} ${big && style.big}`}>
      <div className={style.image}>
        <PosterImage {...posterProps} link big />
      </div>

      <div className={style.box}>
        <h4>{name && name}</h4>
        {
          !big &&
            <>          
              <p>{character && character}</p>
              <p>{knownFor && knownFor}</p>
            </>
        }
      </div>
    </div>
  );
}

export default CelebCard;