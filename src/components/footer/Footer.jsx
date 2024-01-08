import { useEffect, useState } from 'react';
import { useWrapperSwiper } from '../../hooks/useWrapperSwiper';
import PosterImage from '../posterImage/PosterImage';

import style from './footer.module.scss';

const breakpoints = {
  1024: { slidesPerView: 7 },
  768: { slidesPerView: 5 },
  650: { slidesPerView: 4 },
  475: { slidesPerView: 3 },
  375: { slidesPerView: 2 },
  320: { slidesPerView: 1 },
}

const Footer = () => {
  const [historyResults, setHistoryResults] = useState(null);

  const SwiperWrapper = useWrapperSwiper(PosterImage);

  useEffect(() => {
    const history = localStorage.getItem('history');
    const res = history && JSON.parse(history);

    setHistoryResults(res && res);
  }, []);

  console.log(historyResults);

  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.wrapp}>
          <div className={style.history}>
            <h3>Recently viewed</h3>

            <ul>
              {
                historyResults?.map((props) => (
                  <li key={props.id}>
                    <PosterImage {...props} link />
                  </li>
                ))
              }
            </ul>

            {/* {
              historyResults &&
                <SwiperWrapper
                  res={historyResults}
                  white 
                  perView={4}
                  nextEl={'sbnf'}
                  prevEl={'sbpf'}
                  breakpoints={breakpoints}
                />
            } */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;