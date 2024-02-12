import { useCallback, useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import style from './page-switcher.module.scss';

const PageSwitcher = ({total_pages, page}) => {
  const [pageArray, setPageArray] = useState(null);

  const totalPages = useMemo(() => {
    return total_pages && total_pages > 500 ? 500 : total_pages
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

  const hasNaN = pageArray?.some(item => isNaN(item));
  const activeButton = {background: 'var(--orange-400)', color: 'var(--black)', fontWeight: '700'};

  return (
    <>
      {
        !hasNaN && 
          <ul className={style.wrapp}>
            {pageArray?.map((page) => {
              return (
                <li>
                  <Link
                    key={page}
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
}

export default PageSwitcher;