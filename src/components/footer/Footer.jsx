import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom';

import { useWrapperSwiper } from '../../hooks/useWrapperSwiper';
import PosterImage from '../posterImage/PosterImage';

import { TfiBrushAlt } from "react-icons/tfi";
import { FaXTwitter } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";

import TMDBLogo from './tmdb.svg';

import style from './footer.module.scss';

const breakpoints = {
  1024: { slidesPerView: 8 },
  950: { slidesPerView: 6 },
  768: { slidesPerView: 5 },
  650: { slidesPerView: 4 },
  425: { slidesPerView: 3 },
  320: { slidesPerView: 2 },
}

const socialLinks = [
  {logo: <FaHome />, link: 'https://www.themoviedb.org/'},
  {logo: <FaXTwitter />, link: 'https://twitter.com/themoviedb'},
  {logo: <FcAbout />, link: 'https://www.themoviedb.org/about'}
]

const Footer = () => {
  const [historyResults, setHistoryResults] = useState(null);
  const {isAuth} = useSelector(state => state.auth.user);

  const SwiperWrapper = useWrapperSwiper(PosterImage);
  const {pathname} = useLocation();
  
  useEffect(() => {
    const history = localStorage.getItem('history');
    const res = history && JSON.parse(history);

    setHistoryResults(res && res);
  }, [pathname]);

  const clearStory = () => {
    localStorage.removeItem('history');
    setHistoryResults(null);
  }

  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.wrapp}>
          <div className={style.history}>
            <div className={style.history__top}>
              <h2>Recently viewed</h2>
              { historyResults && <button onClick={clearStory}><TfiBrushAlt /></button> }
            </div>
          
            <div className={style.history__bot}>
              {
                historyResults
                  ? <SwiperWrapper
                      res={{results: historyResults}}
                      white 
                      perView={4}
                      nextEl={'sbnf'}
                      prevEl={'sbpf'}
                      breakpoints={breakpoints}
                      link
                    />
                  : <span style={{color: 'var(--grey-400)', fontSize: '.875rem'}}>You have no recently viewed pages</span>
              }
            </div>
          </div>

          <ul className={style.social_list}>
            {
              socialLinks.map(({link, logo}) => (
                <li>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {logo}
                  </a>
                </li>
              ))
            }
          </ul>

          { 
            !isAuth && 
              <div className={style.signIn}>
                <Link to={'/login'}>Sign in for more access</Link>
              </div>
          }

          <a className={style.tmdb_logo} href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            <img src={TMDBLogo} alt={'TMDB'} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;