import Rating from "./Rating/Rating";
import Years from "./Years/Years";
import {useCallback, useMemo} from "react";

const RatingYearsWrapper = (props) => {
  const {ratingMax, ratingMin, setRatingMin, setRatingMax, dateMin, dateMax, setDateMin, setDateMax, firstYear, currentYear} = props

  const getMinValue = useCallback((event, minValue, state, valeLength) => {
    const value = +event.target.value;

    if (valeLength) {
      return value.toString().length >= valeLength && value < minValue ? minValue : value > state ? state : value
    }

    return value < minValue ? minValue : value > state ? state : value
  }, []);

  const getMaxValue = useCallback((event, maxValue, state, valeLength) => {
    const value = +event.target.value;

    if (valeLength) {
      return value.toString().length >= valeLength && value <= state ? state : value > maxValue ? maxValue : value
    }

    return value <= state ? state : value > maxValue ? maxValue : value
  }, []);

  const incMin = useCallback((state, setState) => {
    return setState(c => c < state ? c +1 : c);
  }, []);

  const decMin = useCallback((setState, minValue) => {
    return setState(c => c <= minValue ? minValue : c -1);
  }, []);

  const incMax = useCallback((setState, maxValue) => {
    return setState(c => c < maxValue ? c +1 : c);
  }, []);

  const decMax = useCallback((state, setState) => {
    return setState(c => c > state ? c -1 : c);
  }, []);

  const ratingProps = useMemo(() => {
    return {
      getMinValue, getMaxValue, incMin, decMin, incMax, decMax, ratingMax, ratingMin, setRatingMin, setRatingMax
    }
  }, [getMinValue, getMaxValue, incMin, decMin, incMax, decMax, ratingMax, ratingMin, setRatingMin, setRatingMax]);

  const yearsPros = useMemo(() => {
    return {
      getMinValue, getMaxValue, incMin, decMin, incMax, dateMin, dateMax, setDateMin, setDateMax, firstYear, currentYear
    }
  }, [getMinValue, getMaxValue, incMin, decMin, incMax, dateMin, dateMax, setDateMin, setDateMax, firstYear, currentYear])

  return (
    <>
      <Rating {...ratingProps} />
      <Years {...yearsPros} />
    </>
  );
};

export default RatingYearsWrapper;