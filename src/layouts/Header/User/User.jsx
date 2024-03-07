import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from "react-redux";

import { IMAGE_URL } from '../../../constants/api';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import {fetchGetMovieWatchlist, fetchGetTvWatchlist} from "../../../store/asyncThunks/fetchWatchlist";

import { autoCloser } from '../../../utils/functions';
import { signOut } from '../../../store/slices/fetchAuthSlice';

import style from './User.module.scss';
import {useLocation} from "react-router-dom";

const User = memo(({data, dispatch}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();

  const { lang } = useSelector(state => state.lang);
  const { id, avatar, username } = { ...data };

  useEffect(() => {
    dispatch(fetchGetTvWatchlist({ accountId: id, lang }));
    dispatch(fetchGetMovieWatchlist({ accountId: id, lang }));
  }, [dispatch, id, lang, pathname]);

  useEffect(() => {
    autoCloser('HEADER', isOpen, setIsOpen);
  }, [isOpen]);

  const toggleMenu = useCallback(() => setIsOpen(cur => !cur), []);
  const handleSignOut = useCallback(() => dispatch(signOut()), [dispatch]);
  const avatarPath = useMemo(() => avatar?.['tmdb']?.['avatar_path'], [avatar]);
  const imgSrc = useMemo(() => `${IMAGE_URL}w45${avatarPath}`, [avatarPath]);

  return (
    <div className={style.wrapp} onClick={toggleMenu}>
      <div className={style.avatar}>
        {
          avatarPath
            ? <img src={imgSrc} alt="Avatar" />
            : <FaUserCircle />
        }
      </div>

      <p>{username}</p>
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