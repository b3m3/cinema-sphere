import { Link } from 'react-router-dom';

import style from './logo.module.scss';

const links = [
  {link: '/', name: 'Home'},
  {link: '/movie/popular/1', name: 'Movies'},
  {link: '/tv/top_rated/1', name: 'TV Series'},
  {link: '/person/popular/1', name: 'Celebs'},
]

const Logo = ({onClick, menu}) => {
  return (
    <Link className={style.wrapp} to="/" onClick={onClick}>
      <span>Cinema sphere</span>
      
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
    </Link>
  );
}

export default Logo;