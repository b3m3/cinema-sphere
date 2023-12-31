import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';

import { postRate } from "../../store/slices/rateSlice";

import { FaStar, FaRegStar } from "react-icons/fa";

import style from './rate.module.scss';

const Rate = ({category, id}) => {
  const [isShow, setIsShow] = useState(false);
  const [starSelected, setStarSelected] = useState('');
  const [starHover, setStarHover] = useState('');

  const {error, status, loading} = useSelector(state => state.rate);
  const {isAuth} = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const refModal = useRef(null);

  const close = (event) => {
    if (event.target && event.target === refModal.current) {
      setIsShow(false);
      setStarHover('');
      setStarSelected('');
    }
  }

  const starSelectHandler = (event, index) => {
    if (event.target && event.target.closest('SVG')) {
      setStarSelected(index + 1);
    }
  }
  
  const starHoverHandler = (event, index) => {
    if (event.target && event.target.closest('LI')) {
      setStarHover(index + 1);
    }
  }

  const resetStarHoverHandler = (event) => {
    if (event.target && !event.target.closest('LI')) {
      setStarHover('');
    }
  }

  const FaStarCustom = ({TagName, i}) => {
    return (
      <TagName 
        onMouseMove={e => starHoverHandler(e, i)}
        onClick={(e) => starSelectHandler(e, i)}
        style={{fill: i < starHover ? 'var(--blue-400' : i < starSelected ? 'var(--blue-400)' : ''}}
      />
    )
  }

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
            <FaStar style={{transform: `translateX(-50%) scale(${6 + (starSelected / 4)})`}} />
            <span>{starSelected ? starSelected : '?'}</span>
          </div>

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
            style={!starSelected ? {background: 'var(--grey-400)', pointerEvents: 'none'} : null}
            className={style.rate}
            onClick={() => {
              dispatch(postRate({value: starSelected, id, category}))
              status && !error &&
                setStarHover('');
                setStarSelected('');
                setIsShow(false);
            }}
          >
            Rate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Rate;