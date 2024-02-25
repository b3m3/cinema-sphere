import {useCallback, useState, useMemo, useEffect, memo} from "react";
import { Link, useLocation } from "react-router-dom";

import style from './PageSwitcher.module.scss';

const PageSwitcher = memo(({total_pages, page}) => {
  const [pageArray, setPageArray] = useState(null);

  const totalPages = useMemo(() => {
    return total_pages && total_pages > 500 ? 500 : total_pages <= 1 ? null : total_pages
  }, [total_pages]);

  const currentPage = page;
  const {pathname} = useLocation();

  useEffect(() => {
    const lowerBound = Math.max(2, +currentPage - 3);
    const upperBound = Math.min(+totalPages -1, +currentPage + 3);
    const myArray = Array.from({ length: upperBound - lowerBound + 1 }, (_, i) => lowerBound + i);
  
    myArray.unshift(1);
    myArray.push(+totalPages)

    setPageArray(myArray);
  }, [currentPage, totalPages]);

  const handleClick = useCallback((num) => {
    return `${pathname.slice(0, pathname.lastIndexOf('/'))}/${num}`;
  }, [pathname]);

  const hasNaN = useMemo(() => {
    return pageArray?.some(item => isNaN(item))
  }, [pageArray]);

  const activeButton = useMemo(() => {
    return {background: 'var(--orange-400)', color: 'var(--black)', fontWeight: '700'}
  }, []);

  return (
    <>
      {
        !hasNaN && totalPages &&
          <ul className={style.wrapp}>
            {pageArray?.map((page) => {
              return (
                <li key={page}>
                  <Link
                    to={handleClick(page)}
                    className={style.link}
                    style={+currentPage === +page ? activeButton : null}
                  >
                    {page}
                  </Link>
                </li>
              )
            })}
          </ul>
      }
    </>
  );
})

export default PageSwitcher;