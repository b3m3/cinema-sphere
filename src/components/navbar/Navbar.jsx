import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { isCloseMenu } from '../../store/slices/menuSlice';

import { IoIosCloseCircleOutline } from "react-icons/io";

import style from './navbar.module.scss';

const listArr = [
  {name: 'Movie', path: '/movie/popular/1'},
  {name: 'Tv Series', path: '/tv/popular/1'},
  {name: 'Celebs', path: '/person/1'},
];

const Navbar = () => {
  const { menu } = useSelector(state => state.menu);
  const dispatch = useDispatch();

  return (
    <nav className={`${style.wrapp} ${menu && style.open}`}>
      <ul className={style.list}>
        {listArr.map(({name, path}) => (
          <Link key={name} to={path} onClick={() => dispatch(isCloseMenu())}>
            <li>{name}</li>
          </Link>
        ))}
      </ul>

      <button 
        className={style.close}
        onClick={() => dispatch(isCloseMenu())}
      >
        <IoIosCloseCircleOutline />
      </button>
    </nav>
  );
}

export default Navbar;