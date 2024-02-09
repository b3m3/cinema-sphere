import { Link } from 'react-router-dom';
import style from './title-switcher.module.scss';

const TitleSwitcher = ({titleData}) => {
  return (
    <h1 className={style.title}>
      {titleData?.map(({path, name}, i) => {
        console.log(name);
        return (
          <Link 
            key={i} 
            to={path}
            style={!path ? {pointerEvents: 'none'} : null}
          >
            {name === 'Season 0' ? 'Special' : name}
          </Link>
        )
      })}
    </h1>
  );
}

export default TitleSwitcher;