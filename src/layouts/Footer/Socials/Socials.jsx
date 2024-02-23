import {FaHome} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import {FcAbout} from "react-icons/fc";

import style from './Socials.module.scss'

const socialLinks = [
  {logo: <FaHome />, link: 'https://www.themoviedb.org/'},
  {logo: <FaXTwitter />, link: 'https://twitter.com/themoviedb'},
  {logo: <FcAbout />, link: 'https://www.themoviedb.org/about'}
]

const Socials = () => {
  return (
    <ul className={style.list}>
      {
        socialLinks.map(({link, logo}) => (
          <li key={link}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {logo}
            </a>
          </li>
        ))
      }
    </ul>
  );
};

export default Socials;