import {memo, useCallback} from "react";
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from "react-icons/md";

import style from './Years.module.scss';

const Years = memo((props) => {
  const {getMinValue, getMaxValue, incMin, decMin, incMax, decMax, dateMin, dateMax, setDateMin, setDateMax, firstYear, currentYear} = props

  const blurMinValue = useCallback((event) => {
    return +event.target.value.toString().length < 4 ? firstYear : +event.target.value;
  }, [firstYear]);

  const blurMaxValue = useCallback((event) => {
    return +event.target.value.toString().length < 4 ? currentYear : +event.target.value;
  }, [currentYear]);

  return (
    <div className={style.wrapp}>
      <h3>Date</h3>

      <ul>
        <li>
          <input
            type="number"
            name="date-min"
            value={dateMin}
            onChange={(e) => setDateMin(getMinValue(e, firstYear, dateMax, 4))}
            onFocus={(e) =>  e.target.select()}
            onBlur={(e) => setDateMin(blurMinValue(e))}
          />
          <div>
            <button className={style.arrow_btn} onClick={() => incMin(dateMax, setDateMin)}>
              <MdOutlineKeyboardArrowUp/>
            </button>
            <button className={style.arrow_btn} onClick={() => decMin(setDateMin, firstYear)}>
              <MdOutlineKeyboardArrowDown/>
            </button>
          </div>
        </li>

        <li>
          <input
            type="number"
            name="date-max"
            value={dateMax}
            onChange={(e) => setDateMax(getMaxValue(e, currentYear, dateMin, 4))}
            onFocus={(e) => e.target.select()}
            onBlur={(e) => setDateMax(blurMaxValue(e))}
          />
          <div>
            <button className={style.arrow_btn} onClick={() => incMax(setDateMax, currentYear)}>
              <MdOutlineKeyboardArrowUp/>
            </button>
            <button className={style.arrow_btn} onClick={() => decMax(dateMin, setDateMax)}>
              <MdOutlineKeyboardArrowDown/>
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
});

export default Years;