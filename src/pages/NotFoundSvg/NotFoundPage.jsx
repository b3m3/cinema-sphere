import { Link } from 'react-router-dom';
import NotFoundSvg from '../../assets/images/page-not-found.svg'
import style from './NotFoundSvg.module.scss';

const NotFoundPage = () => {
  return (
    <div className="container">
      <section className={style.wrapp}>
        <h1>404 - Not found page</h1>
        <div className={style.image}>
          <img src={NotFoundSvg} alt="Not found" />
        </div>
        <p>Sorry, the requested page does not exist.</p>
        <Link to={'/'}>
          Go to home page
        </Link>
      </section>
    </div>
  );
}

export default NotFoundPage;