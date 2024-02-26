import { useMemo } from 'react';

import PosterImage from '../PosterImage/PosterImage';

import style from './CelebCard.module.scss';

const CelebCard = ({id, name, character, profilePath, knownFor, big}) => {

  const posterProps = useMemo(() => {
    return {id, posterPath: profilePath, title: name, category: 'person'}
  }, [id, profilePath, name])

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