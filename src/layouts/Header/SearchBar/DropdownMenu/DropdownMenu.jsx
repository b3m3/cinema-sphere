import {MdOutlineArrowDropDown} from "react-icons/md";
import {useCallback, useEffect, useState, memo} from "react";

import {autoCloser} from "../../../../utils/functions";

import style from './DropdownMenu.module.scss';

const options = ['All', 'Movies', 'Tv Series', 'Celebs']

const DropdownMenu = memo(({selectedOption, optionHandler}) => {
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);

  useEffect(() => {
    autoCloser('HEADER', openDropdownMenu, setOpenDropdownMenu);
  }, [openDropdownMenu]);

  const dropdownMenuHandler = useCallback(() => {
    setOpenDropdownMenu(c => !c)
  }, [])
  
  return (
    <div className={style.wrapp} onClick={dropdownMenuHandler}>
      <span>{selectedOption}</span>
      <MdOutlineArrowDropDown/>

      <ul className={openDropdownMenu ? style.open_select : ''}>
        {options.map((option) => (
          <li
            key={option}
            style={selectedOption === option ? {color: 'var(--orange-400'} : null}
            onClick={() => optionHandler(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default DropdownMenu;