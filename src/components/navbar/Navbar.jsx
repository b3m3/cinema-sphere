import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { isCloseMenu } from '../../store/slices/menuSlice';

import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdLocalMovies } from "react-icons/md";
import { PiTelevisionSimple } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";

import Logo from '../logo/Logo';
import Language from '../language/Language';
import WatchListBtn from '../watchListBtn/WatchListBtn';

import style from './navbar.module.scss';

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
      { name: 'Popular', path: '/tv/popular/1' },
      { name: 'Airing today', path: '/tv/airing_today/1' },
      { name: 'On the air', path: '/tv/on_the_air/1' },
      { name: 'Top rated', path: '/tv/top_rated/1' },
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

const Navbar = () => {
  const { menu } = useSelector(state => state.menu);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(isCloseMenu());
  }

  return (
    <div className={`${style.wrapp} ${menu && style.open}`}>
      <div className="container">
        <nav className={style.navbar}>
          <div className={style.top}>
            <Logo onClick={handleClose} />
            <div className={style.hover}>
              <Language />
              <WatchListBtn/>
            </div>
            <button 
              className={style.close}
              onClick={() => dispatch(isCloseMenu())}
            >
              <IoIosCloseCircleOutline />
            </button>
          </div>
          <ul className={style.list}>
            {array.map(({title, icon, links}) => (
              <li key={title}>
                <h3>{icon} {title}</h3>

                <p>
                  {links.map(({name, path}) => (
                    <Link key={name} to={path} onClick={() => handleClose()}>
                      {name}
                    </Link>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;