import Popularity from "../../../components/Popularity/Popularity";
import DeathDay from "../../../components/DeathDay/DeathDay";
import style from './TopHeader.module.scss';

const TopHeader = ({name, popularity, knownFor, deathday, birthday}) => {
  return (
    <div className={style.head}>
      <div className={style.head__left}>
        <div className={style.head__left_box}>
          <h1>{name}</h1>
          <DeathDay deathday={deathday} birthday={birthday} />
        </div>

        <div className={style.head__left_box}>
          <p>{ knownFor }</p>
        </div>
      </div>

      <div className={style.head__right}>
        <Popularity popularity={popularity}/>
      </div>
    </div>
  );
};

export default TopHeader;