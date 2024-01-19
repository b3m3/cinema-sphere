import { Link } from 'react-router-dom';
import style from './not-found-page.module.scss';

const NotFoundPage = () => {
  return (
    <div className="container">
      <section className={style.wrapp}>
        <h1>404 - Not found page</h1>
        <p>Sorry, the requested page does not exist.</p>
        <Link to={'/'}>
          Go to home page
        </Link>
      </section>
    </div>
  );
}

export default NotFoundPage;