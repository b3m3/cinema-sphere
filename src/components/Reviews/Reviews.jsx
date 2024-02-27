import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { fetchReviews } from "../../store/asyncThunks/fetchReviews";

import Title from '../Title/Title';
import Rating from '../Rating/Rating';

import { HiDotsHorizontal } from "react-icons/hi";

import style from './Reviews.module.scss';

const Reviews = memo(({category, id}) => {
  const [currentItem, setCurrentItem] = useState(null);
  const {res} = useSelector(state => state.reviews);
  const dispatch = useDispatch();

  const itemsRefs = useRef([]);

  useEffect(() => {
    dispatch(fetchReviews({category, id}))
  }, [dispatch, category, id]);

  const toggler = useCallback((index) => {
    return currentItem === (index +1) ? setCurrentItem(null) : setCurrentItem(index +1)
  }, [currentItem])

  const height = useMemo(() => {
    return itemsRefs?.current[currentItem -1]?.scrollHeight
  }, [itemsRefs, currentItem]);

  return (
    <>
      {
        Boolean(res?.results?.length) &&
          <div className={style.wrapp}>
            <Title title='Reviews' />

            <ul className={style.list}>
              {res?.results?.map(({id, url, author, content, created_at, author_details}, i) => {
                return (
                  <li key={id} className={style.item}>
                    <div className={style.main}>
                      <div className={style.row}>
                        <h3>{author_details?.username ? author_details.username : 'User'}</h3>
                        <Rating rating={author_details.rating} />

                        {
                          itemsRefs?.current[i]?.scrollHeight > 30 &&
                          <button className={style.toggler} onClick={() => toggler(i)}>
                            <HiDotsHorizontal />
                          </button>
                        }
                      </div>

                      <p
                        className={`${style.main_content} ${currentItem === (i +1) && style.opened}`}
                        ref={el => itemsRefs.current[i] = el}
                        style={
                          currentItem && currentItem === i +1
                            ? {height}
                            : null
                        }
                      >
                        {content}
                      </p>
                    </div>

                    <div className={style.bottom}>
                      <a
                        href={url ? url : ' '}
                        className={style.link}
                        rel="noopener noreferrer"
                        target='__blank'
                      >
                        {author ? author : 'Author'}
                      </a>
                      <span>{created_at && moment(created_at).format('MMM DD, YYYY')}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
      }
    </>
  );
})

export default Reviews;