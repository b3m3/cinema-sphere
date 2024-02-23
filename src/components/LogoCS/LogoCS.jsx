import { memo } from 'react';
import { Link } from 'react-router-dom';

import style from './LogoCS.module.scss';

const links = [
  {link: '/', name: 'Home'},
  {link: '/movie/popular/1', name: 'Movies'},
  {link: '/tv/top_rated/1', name: 'TV Series'},
  {link: '/person/popular/1', name: 'Celebs'},
]

const LogoCS = memo(({onClick, menu}) => {
  return (
    <div className={style.wrapp}>
      <Link className={style.logo} to="/" onClick={onClick}>Cinema sphere</Link>
      
      {
        menu &&
          <div className={style.hover}>
            <ul>
              {links.map(({link, name}) => (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
      }
    </div>
  );
})

export default LogoCS;