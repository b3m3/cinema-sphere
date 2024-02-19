import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeLang } from '../../store/slices/languageSlice';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { autoCloser } from '../../utils/functions';

import style from './language.module.scss';

const langArr = [
  {name: 'English', code: 'en'},
  {name: 'Українська', code: 'uk'},
  {name: 'Русский', code: 'ru'}
];

const Language = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { lang } = useSelector(state => state.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    const getStorageLang = localStorage.getItem('lang');
    dispatch(changeLang(getStorageLang ? getStorageLang : 'en'));
  }, [dispatch]); // Get language in local storage

  useEffect(() => {
    autoCloser('HEADER', isOpen, setIsOpen);
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    return setIsOpen(cur => !cur);
  }, []);

  const handleClick = useCallback((code) => {
    dispatch(changeLang(code));
    setIsOpen(false);
  }, [dispatch])
  
  return (
    <div className={style.wrapp}>
      <p className={style.title} onClick={toggleMenu}>
        <span>{lang}</span>
        <MdOutlineArrowDropDown style={isOpen && {transform: 'rotate(180deg)'}} />
      </p>

      <ul className={`${style.list} ${isOpen && style.open}`}>
        {langArr.map(({name, code}) => (
          <li 
            key={code} 
            className={style.item}
            onClick={() => handleClick(code)}
            style={code === lang ? {color: 'var(--orange-400)'} : null}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Language;