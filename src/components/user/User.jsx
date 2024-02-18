import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { IMAGE_URL } from '../../constants/api';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

import { autoCloser } from '../../utils/functions';
import { signOut } from '../../store/slices/authSlice';

import style from './user.module.scss';

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const { data } = useSelector(state => state.auth.user);
  
  const toggleMenu = () => {
    return setIsOpen(cur => !cur);
  }

  useEffect(() => {
    autoCloser('HEADER', isOpen, setIsOpen);
  }, [isOpen]);

  return (
    <div className={style.wrapp} onClick={toggleMenu}>
      <div className={style.avatar}>
        {
          data?.avatar?.tmdb?.avatar_path
            ? <img src={`${IMAGE_URL}w45${data?.avatar?.tmdb?.avatar_path}`} alt="Avatar" />
            : <FaUserCircle />
        }
      </div>

      <p>{data?.username}</p>
      <MdOutlineArrowDropDown style={isOpen && {transform: 'rotate(180deg)'}} />

      <ul className={`${style.list} ${isOpen && style.open}`}>
        <li className={style.list_item}>
          <button onClick={() => dispatch(signOut())}>Sign Out</button>
        </li>
      </ul>
    </div>
  );
}

export default User;