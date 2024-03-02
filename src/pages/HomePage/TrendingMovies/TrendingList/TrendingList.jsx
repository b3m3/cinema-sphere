import React, {memo} from 'react';
import {Link} from "react-router-dom";

import PosterImage from "../../../../components/PosterImage/PosterImage";
import Rating from "../../../../components/Rating/Rating";

import style from './TrendingList.module.scss'

const TrendingList = memo(({id, queueArray, title, overview, rating, srcPosterImg}) => {
  return (
    <ul className={style.list}>
      {queueArray.map(({item}, i) => (
        <li className={style.list_item} key={i}>
          <PosterImage posterPath={srcPosterImg(item)} id={id(item)} category={'movie'} link/>
          <Link to={`/movie/${id(item)}`}>
            <div className={style.list_title}>
              <p>{title(item)}</p>
              <Rating rating={rating(item)}/>
            </div>
            <span className={style.list_overview}>{overview(item)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
});

export default TrendingList;