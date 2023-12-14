import { Link, useLocation } from "react-router-dom";

import { useCategoryFromLocation } from '../../hooks/useCategoryFromLocation';
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

import style from './page-switcher.module.scss';

const PageSwitcher = ({total_pages, page}) => {
  const {pathname} = useLocation();

  const category = useCategoryFromLocation();

  const total = total_pages && total_pages > 500 ? 500 : total_pages;

  const switchPage = (num) => {
    return `/${category}/${pathname.split('/')[2]}/${num}`;
  }

  return (
    <>
      {
        total > 1 &&
        <ul className={style.wrapp}>
          <li>
            <Link className={style.Link} to={+page !== 1 && switchPage(+page - 1)}>
              <IoIosArrowBack/>
            </Link>
          </li>
          <li>
            <Link className={style.Link} to={switchPage(1)}>1</Link>
          </li>
          { +page  !== 1 &&  <li>...</li> }
          {[3,2,1].map((el, i) => (
            +page - el > 1 &&
              <li key={i}>
                <Link className={style.Link} to={switchPage(+page - el)}>{+page - el}</Link>
              </li>
          ))}
          {[...Array(3)].map((_, i) => (
            +page + i + 1 < total &&
              <li key={i}>
                <Link className={style.Link} to={switchPage(+page + i + 1)}>{+page + i + 1}</Link>
              </li>
          ))}
          { +total !== +page && <li>...</li> }
          <li>
            <Link className={style.Link} to={switchPage(total)}>{total}</Link>
          </li>
          <li>
            <Link className={style.Link} to={+page !== total && switchPage(+page + 1)}>
              <IoIosArrowForward/>
            </Link>
          </li>
        </ul>
      }
    </>
  );
}

export default PageSwitcher;