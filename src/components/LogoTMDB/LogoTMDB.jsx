import TMDBLogo from "../../assets/icons/tmdb.svg";
import style from './LogoTMDB.module.scss'

const LogoTMDB = () => {
  return (
    <a className={style.logo} href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
      <img src={`${TMDBLogo}`} alt={'TMDB'}/>
    </a>
  );
};

export default LogoTMDB;