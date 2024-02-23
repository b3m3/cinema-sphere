import { useSelector } from 'react-redux'

import History from "./History/History";
import Socials from "./Socials/Socials";
import SingInBtn from "../../components/SingInBtn/SingInBtn";
import LogoTMDB from "../../components/LogoTMDB/LogoTMDB";

import style from './Footer.module.scss';

const Footer = () => {
  const {isAuth} = useSelector(state => state.auth.user);

  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.wrapp}>
          <History />
          <Socials />
          { !isAuth && <SingInBtn big={true} /> }
          <LogoTMDB />
        </div>
      </div>
    </footer>
  );
}

export default Footer;