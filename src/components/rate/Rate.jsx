import { Link } from "react-router-dom";
import { useCallback, useMemo, useRef, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';

import { postRate } from "../../store/slices/rateSlice";

import { FaStar, FaRegStar } from "react-icons/fa";

import style from './rate.module.scss';

const Rate = ({category, id, title}) => {
  const [isShow, setIsShow] = useState(false);
  const [starSelected, setStarSelected] = useState('');
  const [starHover, setStarHover] = useState('');

  const {error, status} = useSelector(state => state.rate);
  const {isAuth} = useSelector(state => state.auth.user);
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
    dispatch(postRate({value: starSelected, id, category}))
    status && !error &&
      setStarHover('');
      setStarSelected('');
      setIsShow(false);
  }, [dispatch, error, category, id, starSelected, status])

  return (
    <div className={style.wrapp}>
      <h4>YOUR RATING</h4>

      {
        isAuth
          ? <button className={style.button} onClick={() => setIsShow(true)}>
              <FaRegStar />
              <span>Rate</span>
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
        </div>
      </div>
    </div>
  );
}

export default Rate;