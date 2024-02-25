import {Link} from "react-router-dom";
import {MdLocalMovies} from "react-icons/md";
import {PiTelevisionSimple} from "react-icons/pi";
import {memo} from "react";
import {FaUsers} from "react-icons/fa";

import style from './MenuListItems.module.scss';

const array = [
  {
    title: 'Movie',
    icon: <MdLocalMovies/>,
    links: [
      { name: 'Popular', path: '/movie/popular/1' },
      { name: 'Now playing', path: '/movie/now_playing/1' },
      { name: 'Upcoming', path: '/movie/upcoming/1' },
      { name: 'Top rated', path: '/movie/top_rated/1' },
    ]
  },
  {
    title: 'Tv Series',
    icon: <PiTelevisionSimple />,
    links: [
      { name: 'Top rated', path: '/tv/top_rated/1' },
      { name: 'Popular', path: '/tv/popular/1' },
      { name: 'Airing today', path: '/tv/airing_today/1' },
      { name: 'On the air', path: '/tv/on_the_air/1' },
    ]
  },
  {
    title: 'Celebs',
    icon: <FaUsers />,
    links: [
      { name: 'Popular', path: '/person/popular/1' },
    ]
  },
]

const MenuListItems = memo(({handleCloseNavbar}) => {
  return (
    <ul className={style.wrapp}>
      {array.map(({title, icon, links}) => (
        <li key={title}>
          <h3>{icon} {title}</h3>

          <p>
            {links.map(({name, path}) => (
              <Link key={name} to={path} onClick={handleCloseNavbar}>
                {name}
              </Link>
            ))}
          </p>
        </li>
      ))}
    </ul>
  );
});

export default MenuListItems;