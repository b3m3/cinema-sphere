import {useCallback, useMemo, useRef} from "react";
import {useDispatch} from "react-redux";

import Loading from "../../Loading/Loading";
import Error from "../../Error/Error";
import {postRating} from "../../../store/asyncThunks/fetchRating";
import {FaRegStar, FaStar} from "react-icons/fa";

import style from './Modal.module.scss';

const Modal = (props) => {
  const {id, category, isShow, setStarSelected, starHover, starSelected, setStarHover, title, error,
    status, setIsShow, loading} = props;

  const dispatch = useDispatch();
  const refModal = useRef(null);

  const close = useCallback((event) => {
    if (event.target && event.target === refModal.current) {
      setIsShow(false);
      setStarHover('');
      setStarSelected('');
    }
  }, [setIsShow, setStarHover, setStarSelected]);

  const starStyle = useMemo(() => {
    return {transform: `translateX(-50%) scale(${6 + (starSelected / 4)})`}
  }, [starSelected]);

  const rateBtnStyle = useMemo(() => {
    return !starSelected ? {background: 'var(--grey-400)', pointerEvents: 'none'} : null
  }, [starSelected]);

  const rateBtnHandler = useCallback(() => {
    dispatch(postRating({value: starSelected, id, category}));
  }, [dispatch, category, id, starSelected]);

  const resetStarHoverHandler = useCallback((event) => {
    if (event.target && !event.target.closest('LI')) {
      return setStarHover('');
    }
  }, [setStarHover]);

  // CUSTOM STAR

  const starHoverHandler = useCallback((event, index) => {
    if (event.target && event.target.closest('LI')) {
      return setStarHover(index + 1);
    }
  }, [setStarHover]);

  const starSelectHandler = useCallback((event, index) => {
    if (event.target && event.target.closest('SVG')) {
      return setStarSelected(index + 1);
    }
  }, [setStarSelected]);

  const StarCustom = ({index}) => {
    const CustomTag  = useMemo(() => index < starSelected ? FaStar : FaRegStar, [index]);

    const style = useMemo(() => {
      return {fill: index < starHover ? 'var(--blue-400)' : index < starSelected ? 'var(--blue-400)' : ''}
    }, [index]);

    return (
      <CustomTag
        onMouseMove={(e) => starHoverHandler(e, index)}
        onClick={(e) => starSelectHandler(e, index)}
        style={style}
      />
    )
  }

  return (
    <div
      className={`${style.modal} ${isShow && style.show}`}
      ref={refModal}
      onClick={close}
      onMouseMove={resetStarHoverHandler}
    >
      <div className={style.modal_wrapp}>
        <div className={style.modal_star}>
          <FaStar style={starStyle}/>
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
                        <button><StarCustom index={i} /></button>
                      </li>
                    ))}
                  </ul>

                  <button style={rateBtnStyle} className={style.rate} onClick={rateBtnHandler}>Rate</button>
                </>
        }
      </div>
    </div>
  );
};

export default Modal;