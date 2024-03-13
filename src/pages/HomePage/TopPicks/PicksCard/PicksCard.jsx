import { Link } from 'react-router-dom';
import {memo, useMemo} from 'react';

import { IoIosList } from "react-icons/io";

import Anime from '../../../../assets/images/picks/poster_anime.webp';
import Horror from '../../../../assets/images/picks/poster_horror.webp';
import Comedy from '../../../../assets/images/picks/poster_comedy.webp';
import Mafia from '../../../../assets/images/picks/poster_maffia.webp';
import Zombie from '../../../../assets/images/picks/poster_zombie.webp';
import Forties from '../../../../assets/images/picks/poster_forties.webp';

import style from './PicksCard.module.scss';

const PicksCard = memo(({name}) => {

  const data = useMemo(() => {
    switch (name) {
      case "Anime":
        return {src: Anime, link: '/discover/tv/&include_adult=false&with_keywords=210024&/1'};
      case "Horror":
        return {src: Horror, link: '/discover/movie/&with_genres=27&/1'};
      case "Comedy":
        return {src: Comedy, link: '/discover/movie/&with_genres=35&/1'};
      case "Mafia":
        return {src: Mafia, link: '/discover/movie/&include_adult=false&with_keywords=10391&/1'};
      case "Zombie":
        return {src: Zombie, link: '/discover/movie/&include_adult=false&with_keywords=12377&/1'};
      case "1940s":
        return {src: Forties, link: '/discover/movie/&include_adult=false&with_keywords=207883&/1'};
      default: return {};
    }
  }, [name]);

  return (
    <div className={style.wrapp}>
      <div className={style.main}>
        <Link className={style.img} to={data.link}>
          <img src={`${data.src}`} alt={name} />
        </Link>

        <p><IoIosList /> <span>List</span></p>
      </div>

      <h3>{name}</h3>
    </div>
  );
})

export default PicksCard;