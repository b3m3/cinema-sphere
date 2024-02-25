import { Link } from 'react-router-dom';
import {memo, useMemo} from 'react';

import { IoIosList } from "react-icons/io";

import Anime01 from '../../../../assets/images/picks/anime_01.webp';
import Anime02 from '../../../../assets/images/picks/anime_02.webp';
import Anime03 from '../../../../assets/images/picks/anime_03.webp';
import Horror01 from '../../../../assets/images/picks/horror_01.webp';
import Horror02 from '../../../../assets/images/picks/horror_02.webp';
import Horror03 from '../../../../assets/images/picks/horror_03.webp';
import Comedy01 from '../../../../assets/images/picks/comedy_01.webp';
import Comedy02 from '../../../../assets/images/picks/comedy_02.webp';
import Comedy03 from '../../../../assets/images/picks/comedy_03.webp';

import style from './PicksCard.module.scss';

const PicksCard = memo(({link, name}) => {
  const data = useMemo(() => {
    switch (name) {
      case "Anime":
        return [Anime01, Anime02, Anime03]

      case "Horror":
        return [Horror01, Horror02, Horror03]

      case "Comedy":
        return [Comedy01, Comedy02, Comedy03]
    
      default:
        return [];
    }
  }, [name]);

  return (
    <div className={style.wrapp}>
      <div className={style.main}>
        <Link className={style.img} to={link}>
          {data?.map(src => (
            <img src={src} alt=" " key={src} />
          ))}
        </Link>

        <p><IoIosList /> <span>List</span></p>
      </div>

      <h3>{name}</h3>
    </div>
  );
})

export default PicksCard;