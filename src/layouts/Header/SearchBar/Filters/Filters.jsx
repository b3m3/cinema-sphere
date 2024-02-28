import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { IoClose } from "react-icons/io5";
import SortOptions from "./SortOptions/SortOptions";
import CategoryOptions from "./CategoryOptions/CategoryOptions";
import GenresOptions from "./GenresOptions/GenresOptions";
import RatingYearsWrapper from "./RatingYearsWrapper";

import style from './Filters.module.scss';

const firstYear = 1970;
const currentYear = new Date().getFullYear();

const Filters = ({handleCloseFilters}) => {
  const [category, setCategory] = useState('movie');
  const [sort, setSort] = useState('Popularity.desc');
  const [genres, setGenres] = useState([]);
  const [ratingMin, setRatingMin] = useState(1);
  const [ratingMax, setRatingMax] = useState(10);
  const [dateMin, setDateMin] = useState(firstYear);
  const [dateMax, setDateMax] = useState(currentYear);

  const {pathname} = useLocation();

  // Get Filters with pathname
  useEffect(() => {
    const isDiscover =  pathname.split('/')[1] === 'discover';

    if (isDiscover) {
      const getElem = (name) => {
        return pathname.slice(pathname.indexOf(name)).split('&')[0].split('=')[1];
      }

      const getCategoryPath = () => {
        return pathname.split('/')[2] === 'movie' 
          ? 'movie' : pathname.split('/')[2] === 'tv' ? 'tv' : null;
      }

      getCategoryPath() && setCategory(getCategoryPath())
      getElem('sort_by=') && setSort(getElem('sort_by='))
      getElem('with_genres=') && setGenres(getElem('with_genres=').split(',').map(el => +el));
      getElem('vote_average.gte=') && setRatingMin(+getElem('vote_average.gte='));
      getElem('vote_average.lte=') && setRatingMax(+getElem('vote_average.lte='));
      getElem('primary_release_date.gte=') && setDateMin(+getElem('primary_release_date.gte='));
      getElem('primary_release_date.lte=') && setDateMax(+getElem('primary_release_date.lte='));
    }
  }, [pathname]);
  
  const link = useMemo(() => {
    return `/discover/${category}/&include_adult=false&vote_count.gte=25&sort_by=${sort}&with_genres=${genres.join(',')}&vote_average.gte=${ratingMin}&vote_average.lte=${ratingMax}&primary_release_date.gte=${dateMin}&primary_release_date.lte=${dateMax}&/1`;
  }, [category, sort, genres, ratingMin, ratingMax, dateMin, dateMax]);
  
  const activeStyle = useMemo(() => {
    return {border: '1px solid var(--orange-400)', background: 'var(--orange-400)', color: 'var(--black)'}
  }, []);

  return (
    <div className={style.wrapp}>
      
      <div className={style.body}>
        <div className={style.top}>
          <CategoryOptions
            category={category}
            setCategory={setCategory}
            setGenres={setGenres}
            activeStyle={activeStyle}
          />
          <SortOptions
            sort={sort}
            setSort={setSort}
            activeStyle={activeStyle}
          />
          <GenresOptions
            category={category}
            genres={genres}
            setGenres={setGenres}
            activeStyle={activeStyle}
          />
          <RatingYearsWrapper
            ratingMin={ratingMin}
            ratingMax={ratingMax}
            setRatingMin={setRatingMin}
            setRatingMax={setRatingMax}
            dateMin={dateMin}
            dateMax={dateMax}
            setDateMin={setDateMin}
            setDateMax={setDateMax}
            firstYear={firstYear}
            currentYear={currentYear}
          />
        </div>

        <div className={style.bottom}>
          <button onClick={handleCloseFilters}>Close</button>
          <Link to={link} onClick={handleCloseFilters}>Search</Link>
        </div>

        <button className={style.close} onClick={handleCloseFilters}>
          <IoClose />
        </button>
      </div>
    </div>
  );
}

export default Filters;