import PicksCard from "./PicksCard/PicksCard";
import style from './TopPicks.module.scss';

const arr = [
  {name: 'Anime', link: '/discover/tv/&include_adult=false&with_keywords=210024&/1'},
  {name: 'Comedy', link: '/discover/movie/&with_genres=35&/1'},
  {name: 'Horror', link: '/discover/movie/&with_genres=27&/1'},
];

const TopPicks = () => {
  return (
    <div className={style.wrapp}>
      <h2>Top picks</h2>

      <ul>
        {arr.map(({name, link}) => (
          <li key={name}>
            <PicksCard name={name} link={link}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopPicks;