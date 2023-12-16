import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';

import { fetchDetails, fetchVideos, fetchImages } from '../../store/slices/fetchDataSlice';
import { IMAGE_URL } from '../../constants/api';

import Rating from '../../components/rating/Rating';
import VideoTrailer from '../../components/videoTrailer/VideoTrailer';
import Date from '../../components/date/Date';
import Time from '../../components/time/Time';
import Details from '../../components/details/Details';
import AddToWatchlist from '../../components/addToWatchlist/AddToWatchlist';

import { FaRegImage } from "react-icons/fa6";
import { FaPhotoVideo } from "react-icons/fa";


import style from './movie-details.module.scss';

const MovieDetails = () => {
  const {id} = useParams();
  const {lang} = useSelector(state => state.lang);
  const {details} = useSelector(state => state.details);
  const {videos} = useSelector(state => state.videos);
  const {images} = useSelector(state => state.images);
  const dispatch = useDispatch();

  const category = useCategoryFromLocation();

  useEffect(() =>{
    dispatch(fetchDetails({category, lang, id}))
    dispatch(fetchVideos({category, lang, id}))
    dispatch(fetchImages({category, lang, id}))
  }, [dispatch, category, lang, id]);

  console.log(details.res && details.res);

  return (
    <div className={style.wrapp}>
      {
        details.res &&
        <>
          <div className={style.top}>
            <div className="container">
              <div className={style.top__wrapp}>
                <img 
                  src={`${IMAGE_URL}/original/${details.res.backdrop_path}`} 
                  alt={details.res.title}
                  className={style.top__backgroung}
                />

                <div className={style.top__head}>
                  <div className={style.top__head_left}>
                    <h1>{details.res.title}</h1>
                    <ul>
                      <li><Date date={details.res.release_date}/></li>
                      <li><Time minutes={details.res.runtime}/></li>
                    </ul>
                  </div>
                  <div className={style.top__head_right}>
                    <Rating rating={details.res.vote_average} vote_count={details.res.vote_count} />
                  </div>
                </div>

                <div className={style.top__center}>
                  <ul>
                    <li>
                      <img src={`${IMAGE_URL}/w500/${details.res.poster_path}`} alt={details.res.title} />
                    </li>
                    <li>
                      {videos.res?.results.length > 0 && <VideoTrailer url={videos.res.results[0].key} />}
                    </li>
                    <li>
                      <div className={style.top__center_media}>
                        <FaRegImage />
                        <span>{images?.res?.posters.length > 1 ? images?.res?.posters.length + ' IMAGES' : images?.res?.posters.length + ' IMAGE'}</span>
                      </div>
                      <div className={style.top__center_media}>
                        <FaPhotoVideo />
                        <span>{videos?.res?.results.length > 1 ? videos?.res?.results.length + ' VIDEOS' : videos?.res?.results.length + ' VIDEO'}</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className={style.top__bottom}>
                  <ul className={style.top__bottom_genres}>
                    {details.res?.genres?.map(({id, name}) => (
                      <li key={id}>{name}</li>
                    ))}
                  </ul>

                  <div className={style.top__bottom_block}>
                    <Details id={id} category={category} {...details.res && details.res} />
                    <div>
                      <div>
                        {/* {details.res.production_companies.map(({id, name, logo_path}) => {
                          logo_path && (
                            <img className={style.logo_company}  key={id} src={IMAGE_URL+'w500'+logo_path} alt={name} />
                          )
                        })} */}
                      </div>
                      <AddToWatchlist orange/>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className={style.body}>
            <div className="container">
              <div className={style.body__wrapp}>
                <ul>
                  <li>body</li>
                  <li>body1</li>
                  <li>body1</li>
                  <li>body1</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default MovieDetails;