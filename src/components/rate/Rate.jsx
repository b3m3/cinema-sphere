import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';

import { postRating, getRating } from "../../store/asyncThunks/fetchRating";
import { clearRateStates } from "../../store/slices/fetchRatingSlice";

import Loading from "../loading/Loading";
import Error from "../error/Error";
import { FaStar, FaRegStar } from "react-icons/fa";

import style from './rate.module.scss';

const Rate = ({category, id, title}) => {
  const [isShow, setIsShow] = useState(false);
  const [starSelected, setStarSelected] = useState('');
  const [rateValue, setRateValue] = useState(null);
  const [starHover, setStarHover] = useState('');

  const { user } = useSelector(state => state.auth);
  const { error, status, loading } = useSelector(state => state.rate.post);
  const { rated } = useSelector(state => state.rate);
  const { lang } = useSelector(state => state.lang);

  const dispatch = useDispatch();
  const refModal = useRef(null);

  const close = useCallback((event) => {
    if (event.target && event.target === refModal.current) {
      setIsShow(false);
      setStarHover('');
      setStarSelected('');
    }
  }, []);

  const starSelectHandler = useCallback((event, index) => {
    if (event.target && event.target.closest('SVG')) {
      return setStarSelected(index + 1);
    }
  }, [])
  
  const starHoverHandler = useCallback((event, index) => {
    if (event.target && event.target.closest('LI')) {
      return setStarHover(index + 1);
    }
  }, []);

  const resetStarHoverHandler = useCallback((event) => {
    if (event.target && !event.target.closest('LI')) {
      return setStarHover('');
    }
  }, []);

  const FaStarCustom = ({TagName, i}) => {
    const style = useMemo(() => {
      return {fill: i < starHover ? 'var(--blue-400' : i < starSelected ? 'var(--blue-400)' : ''}
    }, [i]);

    return (
      <TagName 
        onMouseMove={e => starHoverHandler(e, i)}
        onClick={(e) => starSelectHandler(e, i)}
        style={style}
      />
    )
  }

  const starStyle = useMemo(() => {
    return {transform: `translateX(-50%) scale(${6 + (starSelected / 4)})`}
  }, [starSelected]);

  const rateBtnStyle = useMemo(() => {
    return !starSelected ? {background: 'var(--grey-400)', pointerEvents: 'none'} : null
  }, [starSelected]);

  const rateBtnHandler = useCallback(() => {
    dispatch(postRating({value: starSelected, id, category}));
  }, [dispatch, category, id, starSelected]);

  useEffect(() => {
    if (status && !error) {
      setRateValue(starSelected);
      setStarHover('');
      setStarSelected('');
      setIsShow(false);
      dispatch(clearRateStates());
    }
    
    if (error) {
      setTimeout(() => {
        setIsShow(false);
        setStarHover('');
        setStarSelected('');
        dispatch(clearRateStates());
      }, 1500);
    }
  }, [dispatch, error, starSelected, status]);

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
  }, [rated, id])

  return (
    <div className={style.wrapp}>
      <h4>YOUR RATING</h4>

      {
        user.isAuth
          ? <button className={style.button} onClick={() => setIsShow(true)}>
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

      <div 
        className={`${style.modal} ${isShow && style.show}`} 
        ref={refModal} 
        onClick={(e) => close(e)}
        onMouseMove={resetStarHoverHandler}
      >
        <div className={style.modal_wrapp}>
          <div className={style.modal_star}>
            <FaStar style={starStyle} />
            <span>{starSelected ? starSelected : '?'}</span>
          </div>

          <h3>{title}</h3>

          {
            loading
              ? <Loading size={12} spinner />
              : error ? <Error status={status.message} />
              : <>
                  <ul className={style.modal_list}>
                    {[...Array(10)].map((_, i) => (
                      <li key={i}>
                        <button>
                          <FaStarCustom 
                            TagName={i < starSelected ? FaStar : FaRegStar}
                            i={i}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <button 
                    style={rateBtnStyle}
                    className={style.rate}
                    onClick={rateBtnHandler}
                  >
                    Rate
                  </button>
                </>
          }
        </div>
      </div>
    </div>
  );
}

export default Rate;