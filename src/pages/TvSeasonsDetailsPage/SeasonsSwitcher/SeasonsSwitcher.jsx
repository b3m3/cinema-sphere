import style from './SeasonsSwitcher.module.scss';
import SwitcherCard from "./SwitcherCard/SwitcherCard";

const SeasonsSwitcher = ({ tvSeriesId, category, res, season }) => {
  const activeStyle = {background: 'linear-gradient( to right, rgba(0, 0, 0, 0), rgba(245,197, 24, 0.3))'};

  return (
    <div className={style.wrapp}>
      <ul>
        {res?.map(({ id, name, air_date, episode_count, poster_path, season_number }) => (
          <li
            key={id}
            style={ +season === +season_number ? activeStyle : null }
          >
            <SwitcherCard
              name={name}
              air_date={air_date}
              episode_count={episode_count}
              poster_path={poster_path}
              season_number={season_number}
              tvSeriesId={tvSeriesId}
              category={category}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SeasonsSwitcher;