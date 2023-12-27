import { FaStar, FaRegStar } from "react-icons/fa";
import { useRef, useState } from "react";


import style from './rate.module.scss';

const Rate = () => {
  const [isShow, setIsShow] = useState(false);
  const [star, setStar] = useState('?')

  const refModal = useRef(null);

  const close = (event) => {
    return event.target === refModal.current && setIsShow(false);
  }

  const starHandler = (event, index) => {
    if (event.target && event.target.closest('SVG')) {
      setStar(index);
    } else {
      console.log(false);
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
      >
        <div 
          className={style.modal_wrapp}
          
        >
          <div className={style.modal_star}>
            <FaStar />
            <span>{star}</span>
          </div>

          {[...Array(10)].map((_, i) => (
            <FaRegStar 
              key={i}
              onMouseMove={(e) => starHandler(e, (i + 1))}
              style={i === star && {color: 'var(--blue-400)'}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rate;