import { Link } from 'react-router-dom';

import style from './Breadcrumbs.module.scss';

const Breadcrumbs = ({id, category, season, tvSeriesName, seasonName, episodeName}) => {
  return (
    <h1 className={style.title}>
      { tvSeriesName && <Link to={`/${category}/${id}`}>{ tvSeriesName }</Link> }
      { seasonName && <Link to={`/${category}/${id}/seasons/${season}`}>{ seasonName }</Link> }
      { episodeName && <Link to={null}>{ episodeName }</Link> }
    </h1>
  );
}

export default Breadcrumbs;