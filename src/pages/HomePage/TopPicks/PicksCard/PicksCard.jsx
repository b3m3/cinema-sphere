import {memo, useCallback, useMemo} from 'react';
import {Link} from "react-router-dom";

import Anime from '../../../../assets/images/picks/Anime.webp';
import Superhero from '../../../../assets/images/picks/Superhero.webp';
import Magic from '../../../../assets/images/picks/Magic.webp';
import Mafia from '../../../../assets/images/picks/Mafia.webp';
import Zombie from '../../../../assets/images/picks/Zombie.webp';
import Forties from '../../../../assets/images/picks/Forties.webp';
import style from './PicksCard.module.scss';

const PicksCard = memo(({name}) => {
  const src = useMemo(() => {
    switch (name) {
      case "Anime":
        return Anime
      case "Magic":
        return Magic
      case "Superhero":
        return Superhero
      case "Mafia":
        return Mafia
      case "Zombie":
        return Zombie
      case "1940s":
        return Forties
      default: return '';
    }
  }, [name]);

  const link = useCallback((category) => {
    switch (name) {
      case "Anime":
        return `/discover/${category}/&include_adult=false&with_keywords=210024&/1`
      case "Magic":
        return `/discover/${category}/&include_adult=false&with_keywords=2343&/1`
      case "Superhero":
        return `/discover/${category}/&include_adult=false&with_keywords=9715&/1`
      case "Mafia":
        return `/discover/${category}/&include_adult=false&with_keywords=10391&/1`
      case "Zombie":
        return `/discover/${category}/&include_adult=false&with_keywords=12377&/1`
      case "1940s":
        return `/discover/${category}/&include_adult=false&with_keywords=207883&/1`
      default: return '';
    }
  }, [name]);

  return (
    <div className={style.wrapp}>
      <div className={style.main}>
        <div className={style.img}>
          <img src={`${src}`} alt={name}/>
        </div>

        <p>
          <Link to={`${link('movie')}`} >Movies</Link>
          <Link to={`${link('tv')}`}>Tv series</Link>
        </p>
      </div>

      <h3>{name}</h3>
    </div>
  );
})

export default PicksCard;