import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Loading from "../../Loading/Loading";
import {clearRateStates} from "../../../store/slices/fetchRatingSlice";
import {getRating} from "../../../store/asyncThunks/fetchRating";
import {FaRegStar, FaStar} from "react-icons/fa";

import style from './BodyUi.module.scss';

const BodyUi = (props) => {
  const { id, status, error, category, setIsShow, starSelected, setStarSelected } = props;

  const [rateValue, setRateValue] = useState(null);

  const { user } = useSelector(state => state.auth);
  const { rated } = useSelector(state => state.rate);
  const { lang } = useSelector(state => state.lang);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status && !error) {
      setRateValue(starSelected);
      setStarSelected('');
      setIsShow(false);
      dispatch(clearRateStates());
    }

    if (error) {
      setTimeout(() => {
        setIsShow(false);
        setStarSelected('');
        dispatch(clearRateStates());
      }, 1500);
    }
  }, [dispatch, error, starSelected, status, setIsShow, setStarSelected]);

  useEffect(() => {
    const newCategory = category === 'movie' ? 'movies' : category;
    const accountId = user?.data?.id;

    if (accountId && category) {
      dispatch(getRating({accountId, category: newCategory, lang}));
    }
  }, [dispatch, user, category, lang]);

  useEffect(() => {
    const _id = +id;

    rated.res?.filter(({id, rating}) => +id === _id ? setRateValue(rating) : null);
  }, [rated, id]);

  const openModal = useCallback(() => {
    return setIsShow(true)
  }, [setIsShow])

  return (
    <div className={style.wrapp}>
      <h4>YOUR RATING</h4>

      {
        user.isAuth
          ? <button className={style.button} onClick={openModal}>
            {
              rated.loading
                ? <Loading size={50} />
                : <>
                  { rateValue ? <FaStar /> : <FaRegStar /> }
                  <span>{rateValue ? `${rateValue}/10` : 'Rate'}</span>
                </>
            }
          </button>
          : <Link to={'/login'} className={style.button}>
              <FaRegStar />
              <span>Rate</span>
            </Link>
      }
    </div>
  );
};

export default BodyUi;