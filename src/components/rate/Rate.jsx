import { FaStar, FaRegStar } from "react-icons/fa";
import { useRef, useState } from "react";

import style from './rate.module.scss';

const Rate = () => {
  const [isShow, setIsShow] = useState(false);
  const [starSelected, setStarSelected] = useState('');
  const [starHover, setStarHover] = useState('');

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

  return (
    <div className={style.wrapp}>
      <h4>YOUR RATING</h4>

      <button className={style.button} onClick={() => setIsShow(true)}>
        <FaRegStar />
        <span>Rate</span>
      </button>

      <div 
        className={`${style.modal} ${isShow && style.show}`} 
        ref={refModal} 
        onClick={(e) => close(e)}
        onMouseMove={resetStarHoverHandler}
      >
        <div className={style.modal_wrapp}>
          <div className={style.modal_star}>
            <FaStar />
            <span>{starSelected ? starSelected : '?'}</span>
          </div>

          <ul className={style.modal_list}>
            {[...Array(10)].map((_, i) => (
              <li key={i}>
                <button>
                  <FaRegStar 
                    key={i} 
                    onClick={(e) => starSelectHandler(e, i)}
                    onMouseMove={e => starHoverHandler(e, i)}
                    style={{fill: i < starHover ? 'var(--blue-400' : i < starSelected ? 'var(--blue-400' : ''}}
                  />
                </button>
              </li>
            ))}
          </ul>


          <button 
            style={!starSelected ? {background: 'var(--grey-400)', pointerEvents: 'none'} : null}
            className={style.rate}
          >
            Rate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Rate;