import {memo} from "react";
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from "react-icons/md";

import style from './Rating.module.scss';

const Rating = memo((props) => {
  const {getMinValue, getMaxValue, incMin, decMin, incMax, decMax, ratingMin, ratingMax, setRatingMin, setRatingMax} = props;

  return (
    <div className={style.wrapp}>
      <h3>Rating</h3>

      <ul>
        <li>
          <input
            type="number"
            name="rating-min"
            value={ratingMin}
            onChange={(e) => setRatingMin(getMinValue(e, 1, ratingMax))}
            onFocus={e => e.target.select()}
          />
          <div>
            <button className={style.arrow_btn} onClick={() => incMin(ratingMax, setRatingMin)}>
              <MdOutlineKeyboardArrowUp/>
            </button>
            <button className={style.arrow_btn} onClick={() => decMin(setRatingMin, 1)}>
              <MdOutlineKeyboardArrowDown/>
            </button>
          </div>
        </li>

        <li>
          <input
            type="number"
            name="rating-max"
            value={ratingMax}
            onChange={(e) => setRatingMax(getMaxValue(e, 10, ratingMin))}
            onFocus={e => e.target.select()}
          />
          <div>
            <button className={style.arrow_btn} onClick={() => incMax(setRatingMax, 10)}>
              <MdOutlineKeyboardArrowUp/>
            </button>
            <button className={style.arrow_btn} onClick={() => decMax(ratingMin, setRatingMax)}>
              <MdOutlineKeyboardArrowDown/>
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
});

export default Rating;