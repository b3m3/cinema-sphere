import PicksCard from "./PicksCard/PicksCard";
import style from './TopPicks.module.scss';

const TopPicks = ({results}) => {
  return (
    <div className={style.wrapp}>
      <h2>Top picks</h2>

      <ul>
        {results.map(name => (
          <li key={name}>
            <PicksCard name={name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopPicks;