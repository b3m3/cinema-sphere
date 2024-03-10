import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";

import Loading from "../../Loading/Loading";
import Error from "../../Error/Error";
import {postRating} from "../../../store/asyncThunks/fetchRating";

import { FaRegStar, FaStar } from "react-icons/fa";
import {IoClose} from "react-icons/io5";

import style from './Modal.module.scss';

const Modal = (props) => {
  const {id, category, isShow, setStarSelected, starSelected, title, error, status, setIsShow, loading} = props;

  const dispatch = useDispatch();

  const bigStarStyle = useMemo(() => {
    return {transform: `translateX(-50%) scale(${6 + (starSelected / 4)})`}
  }, [starSelected]);

  const rateBtnStyle = useMemo(() => {
    return !starSelected ? {background: 'var(--grey-400)', pointerEvents: 'none'} : null
  }, [starSelected]);

  const selectStarHandler = useCallback((index) => {
    return setStarSelected(index + 1)
  }, [setStarSelected]);

  const handleClose = useCallback(() => {
    setStarSelected('');
    setIsShow(false);
  }, [setStarSelected, setIsShow])

  const handlePastRating = useCallback(() => {
    dispatch(postRating({value: starSelected, id, category}));
  }, [dispatch, category, id, starSelected]);

  return (
    <div className={`${style.modal} ${isShow && style.show}`}>
      <div className={style.modal_wrapp}>
        <div className={style.modal_bigStar}>
          <FaStar style={bigStarStyle}/>
          <span>{starSelected ? starSelected : '?'}</span>
        </div>

        <h3>{title}</h3>

        {
          loading
            ? <Loading size={12} spinner/>
            : error ? <Error status={status.message}/>
              : <>
                <ul className={style.modal_list}>
                  {[...Array(10)].map((_, i) => (
                    <li key={i}>
                      <button onClick={() => selectStarHandler(i)}>
                        { i < starSelected ? <FaStar/> : <FaRegStar/> }
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  style={rateBtnStyle}
                  className={style.rate}
                  onClick={handlePastRating}
                >
                  Rate
                </button>
              </>
        }

        <button className={style.close} onClick={handleClose}>
          <IoClose/>
        </button>
      </div>
    </div>
  );
};

export default Modal;