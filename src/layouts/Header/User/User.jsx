import {memo, useCallback, useEffect, useMemo, useState} from 'react';

import { IMAGE_URL } from '../../../constants/api';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

import { autoCloser } from '../../../utils/functions';
import { signOut } from '../../../store/slices/fetchAuthSlice';

import style from './User.module.scss';

const User = memo(({data, dispatch}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = useCallback(() => {
    return setIsOpen(cur => !cur);
  }, []);

  const handleSignOut = useCallback(() => {
    return dispatch(signOut());
  }, [dispatch])

  useEffect(() => {
    autoCloser('HEADER', isOpen, setIsOpen);
  }, [isOpen]);

  const imgSrc = useMemo(() => {
    return `${IMAGE_URL}w45${data?.avatar?.tmdb?.avatar_path}`;
  }, [data]);

  const isAvatar = useMemo(() => {
    return data?.avatar?.tmdb?.avatar_path;
  }, [data])

  return (
    <div className={style.wrapp} onClick={toggleMenu}>
      <div className={style.avatar}>
        {
          isAvatar
            ? <img src={imgSrc} alt="Avatar" />
            : <FaUserCircle />
        }
      </div>

      <p>{data?.username}</p>
      <MdOutlineArrowDropDown style={isOpen && {transform: 'rotate(180deg)'}} />

      <ul className={`${style.list} ${isOpen && style.open}`}>
        <li className={style.list_item}>
          <button onClick={handleSignOut}>Sign Out</button>
        </li>
      </ul>
    </div>
  );
})

export default User;